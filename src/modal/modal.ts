import {Injectable, ComponentFactoryResolver, Injector} from "@angular/core";
import {ModalDialogStack} from "./modal-stack";
import {ModalDialogRef} from "./modal-ref";
export interface ModalDialogOptions {
    header?: string;
    draggable?: boolean;
    modal?: boolean;
    resizable?: boolean;
    closeOnEscape?: boolean;
    showHeader?: boolean;
    closable?: boolean;
    responsive?: boolean;
    dismissableMask?: boolean;
    width?: number;
    height?: number;
}

@Injectable()
export class Modal {

    constructor(private moduleCFR: ComponentFactoryResolver, private injector: Injector,
        private modalStack: ModalDialogStack
    ) {
    }

    open(content: any, options: ModalDialogOptions = {}): ModalDialogRef {
        return this.modalStack.open(this.moduleCFR, this.injector, content, options);
    }
}
