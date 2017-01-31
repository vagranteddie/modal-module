import {
    Directive,
    ComponentFactory,
    Injector,
    Renderer,
    ViewContainerRef,
    ComponentFactoryResolver,
    TemplateRef,
    ComponentRef,
    ReflectiveInjector
} from "@angular/core";
import {ModalDialog} from "./modal-window";
import {ModalDialogStack} from "./modal-stack";
import {ModalDialogRef, ActiveModalDialog} from "./modal-ref";
import {isDefined, ContentRef} from "./util";
@Directive({
    selector: 'template[modalDialogContainer]'
})
export class ModalDialogContainer {

    private windowFactory: ComponentFactory<ModalDialog>;
    private windowCmptRef: ComponentRef<ModalDialog>;

    constructor(private injector: Injector, private renderer: Renderer, private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver, ngDxModalStack: ModalDialogStack
    ) {
        this.windowFactory = componentFactoryResolver.resolveComponentFactory(ModalDialog);
        ngDxModalStack.registerContainer(this);
    }

    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: string | TemplateRef<any>, options
    ): ModalDialogRef {

        const activeModal = new ActiveModalDialog();
        const contentRef = this.getContentRef(moduleCFR, contentInjector, content, activeModal);
        let ngDxModalRef: ModalDialogRef;

        this.windowCmptRef = this.viewContainerRef.createComponent(this.windowFactory, this.viewContainerRef.length - 1, this.injector);

        if (contentRef.componentRef) {
            this.renderer.projectNodes(this.windowCmptRef.instance.contentViewChild.nativeElement, [contentRef.componentRef.location.nativeElement]);
            if (contentRef.componentRef.instance.footer) {
                this.renderer.projectNodes(this.windowCmptRef.instance.footer.nativeElement, [contentRef.componentRef.instance.footer.element]);
            }
        }

        ngDxModalRef = new ModalDialogRef(this.viewContainerRef, this.windowCmptRef, contentRef);
        activeModal.close = (result: any) => {
            ngDxModalRef.close(result);
        };
        activeModal.dismiss = (reason: any) => {
            ngDxModalRef.dismiss(reason);
        };

        this.applyWindowOptions(this.windowCmptRef.instance, options);
        this.windowCmptRef.instance.visible = true;

        return ngDxModalRef;

    }

    private applyWindowOptions(windowInstance: ModalDialog, options: Object) {
        ['modal', 'header', 'draggable', 'resizable', 'closeOnEscape', 'dismissableMask', 'showHeader', 'closable',
            'responsive', 'fullScreen', 'size', 'height', 'width'].forEach((optionName: string) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        })
    }

    private getContentRef(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any,
        context: ActiveModalDialog
    ): ContentRef {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            const viewRef = this.viewContainerRef.createEmbeddedView(<TemplateRef<ActiveModalDialog>>content, context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            const contentCmpFactory = moduleCFR.resolveComponentFactory(content);
            const modalContentInjector = ReflectiveInjector.resolveAndCreate([{
                provide: ActiveModalDialog,
                useValue: context
            }], contentInjector);
            const componentRef = this.viewContainerRef.createComponent(contentCmpFactory, 0, modalContentInjector);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
    }

}
