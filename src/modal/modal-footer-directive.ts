import {Directive, ElementRef} from "@angular/core";
@Directive({
    selector: '[modal-footer]'
})
export class ModalFooter {
    element: HTMLElement;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }
}