import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer,
    trigger,
    state,
    style,
    transition,
    animate,
    ViewChild
} from "@angular/core";
import {ModalDismissReasons} from "./modal-dismiss-reasons";
import {Dialog} from "primeng/components/dialog/dialog";
import {DomHandler} from "primeng/components/dom/domhandler";

@Component({
    selector: 'ngb-dx-modal-window',
    template: `
<div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow flex column':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)" *ngIf="showHeader">
                <span class="ui-dialog-title">{{header}}</span>
                <span class="ui-dialog-title" *ngIf="headerFacet">
                    <!--<ng-content select="p-header"></ng-content>-->
                </span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon  ui-corner-all box':true}" href="#" role="button" (click)="hide($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [style.height.px]="contentHeight">
            </div>
            <div #footer class="footer">
            </div>
            <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"
                (mousedown)="initResize($event)"></div>
        </div>
`,
    providers: [DomHandler],
    animations: [
        trigger('dialogState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    styles: [`
.dlg-90 { height:90%; width:90%; }
.dlg-80 { height:80%; width:80%; }
.dlg-70 { height:70%; width:70%; }
.dlg-60 { height:60%; width:60%; }
.dlg-50 { height:50%; width:50%; }
.dlg-40 { height:40%; width:40%; }
.dlg-30 { height:30%; width:30%; }
.dlg-20 { height:20%; width:20%; }
.footer {
    padding: 5px;
}
`]
})
export class ModalDialog extends Dialog implements OnInit, AfterViewInit, OnDestroy {

    private elementWithFocus: Element;
    private centered: boolean = false;

    @Input() fullScreen: boolean;
    @Input() draggable: boolean = true;
    @Input() resizable: boolean = true;
    @Input() closeOnEscape: boolean = true;
    @Input() showHeader: boolean = true;
    @Input() closable: boolean = true;
    @Input() responsive: boolean = true;
    @Input() dismissableMask: boolean = true;
    @Input() size: number;
    @ViewChild('footer') footer: ElementRef;

    @Output('dismiss') dismissEvent = new EventEmitter();

    ngOnInit(): void {
        this.elementWithFocus = document.activeElement;
        this.renderer.setElementClass(document.body, 'modal-open', true);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (!this.el.nativeElement.contains(document.activeElement)) {
            this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
        }
    }

    ngOnDestroy(): void {
        this.visible = false;
        super.ngOnDestroy();
        if (this.elementWithFocus && document.body.contains(this.elementWithFocus)) {
            this.renderer.invokeElementMethod(this.elementWithFocus, 'focus', []);
        }
        else {
            this.renderer.invokeElementMethod(document.body, 'focus', []);
        }
        this.elementWithFocus = null;
        this.renderer.setElementClass(document.body, 'modal-open', false);
    }

    constructor(public el: ElementRef, domHandler: DomHandler, renderer: Renderer) {
        super(el, domHandler, renderer);
    }

    dismiss(reason): void {
        this.dismissEvent.emit(reason);
    }

    get styleClass() {
        let klazz = 'flex ';
        if (this.fullScreen) {
            klazz += ' fullsize';
        }
        if (!this.fullScreen && this.size) {
            klazz += `dlg-${this.size}`;
        }
        return klazz;
    }

    hide(event) {
        this.dismiss(ModalDismissReasons.CLOSE_BUTTON);
        super.hide(event);
    }

    // onResize(event) {
    //     if (this.resizing) {
    //         let deltaX = event.pageX - this.lastPageX;
    //         let deltaY = event.pageY - this.lastPageY;
    //         let containerWidth = this.domHandler.getWidth(this.container);
    //         let containerHeight = this.domHandler.getHeight(this.container);
    //         let contentHeight = this.domHandler.getOuterHeight(this.contentContainer);
    //         let newWidth = containerWidth + deltaX;
    //         let newHeight = contentHeight + deltaY;
    //         let newContainerHeight = containerHeight + deltaY;
    //
    //         if (newWidth > this.minWidth) {
    //             this.container.style.width = newWidth + 'px';
    //             this.container.style.height = newContainerHeight + 'px';
    //         }
    //
    //         if (newHeight > this.minHeight)
    //             this.contentContainer.style.height = newHeight + 'px';
    //
    //         this.lastPageX = event.pageX;
    //         this.lastPageY = event.pageY;
    //     }
    // }
    //
    // center() {
    //     let elementWidth = this.domHandler.getOuterWidth(this.container);
    //     let elementHeight = this.domHandler.getOuterHeight(this.container);
    //     if (elementWidth == 0 && elementHeight == 0) {
    //         this.container.style.visibility = 'hidden';
    //         this.container.style.display = 'block';
    //         elementWidth = this.domHandler.getOuterWidth(this.container);
    //         elementHeight = this.domHandler.getOuterHeight(this.container);
    //         this.container.style.display = 'none';
    //         this.container.style.visibility = 'visible';
    //     }
    //     let viewport = this.domHandler.getViewport();
    //     let x = (viewport.width - elementWidth) / 2;
    //     let y = (viewport.height - elementHeight) / 2;
    //
    //     this.container.style.left = x + 'px';
    //     this.container.style.top = y + 'px';
    // }
    //
    // centerW(width: number, height: number) {
    //     if (!this.centered) {
    //         this.centered = true;
    //         let viewport = this.domHandler.getViewport();
    //         if (width < viewport.width) {
    //             let x = (viewport.width - width) / 2;
    //             this.container.style.left = x + 'px';
    //             this.width = width;
    //         }
    //         else {
    //             this.width = viewport.width;
    //             this.container.style.left = '0px';
    //         }
    //         if (height < viewport.height) {
    //             let y = (viewport.height - height) / 2;
    //             this.container.style.top = y + 'px';
    //             this.height = height;
    //         }
    //         else {
    //             this.height = viewport.height;
    //             this.container.style.top = '0px';
    //         }
    //     }
    // }
}
