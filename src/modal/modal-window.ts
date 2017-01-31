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
<div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)" *ngIf="showHeader">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <span class="ui-dialog-title" *ngIf="headerFacet">
                    <ng-content select="p-header"></ng-content>
                </span>
                <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" href="#" role="button" (click)="hide($event)">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
            </div>
            <div #footer></div>
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
.footer {
    padding: 5px;
}
`]
})
export class ModalDialog extends Dialog implements OnInit, AfterViewInit, OnDestroy {

    private elementWithFocus: Element;

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

    hide(event) {
        this.dismiss(ModalDismissReasons.CLOSE_BUTTON);
        super.hide(event);
    }

}
