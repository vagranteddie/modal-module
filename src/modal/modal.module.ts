import {NgModule, ModuleWithProviders} from "@angular/core";
import {ModalDialogContainer} from "./modal-container";
import {ModalDialog} from "./modal-window";
import {Modal} from "./modal";
import {ModalDialogStack} from "./modal-stack";
import {DialogModule} from "primeng/components/dialog/dialog";
import {CommonModule} from "@angular/common";
import {ModalFooter} from "./modal-footer-directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/components/common/shared";
@NgModule({
    declarations: [ModalDialogContainer, ModalDialog, ModalFooter],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule, SharedModule],
    entryComponents: [ModalDialog],
    providers: [Modal],
    exports: [ModalDialogContainer, ModalFooter]
})
export class ModalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalModule, providers: [Modal, ModalDialogStack]
        }
    }
}