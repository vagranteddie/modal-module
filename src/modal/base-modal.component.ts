import {ViewChild, Component} from "@angular/core";
import {ModalFooter} from "./modal-footer-directive";

@Component({})
export class BaseModalComponent {
    @ViewChild(ModalFooter) footer: ModalFooter;
}
