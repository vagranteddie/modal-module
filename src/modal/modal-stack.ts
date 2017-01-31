import {Injectable, ComponentFactoryResolver, Injector} from "@angular/core";
import {ModalDialogContainer} from "./modal-container";
import {ModalDialogRef} from "./modal-ref";
@Injectable()
export class ModalDialogStack {
    private modalContainer: ModalDialogContainer;

    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options = {}): ModalDialogRef {
        if (!this.modalContainer)
            throw new Error('Missing modal container, add <template modalDialogContainer></template> to one of application templates');

        return this.modalContainer.open(moduleCFR, contentInjector, content, options);
    }

    registerContainer(modalContainer: ModalDialogContainer) {
        this.modalContainer = modalContainer;
    }
}