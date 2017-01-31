import {Component, OnInit, Input} from "@angular/core";
import {ActiveModalDialog} from "../modal/modal-ref";
import {BaseModalComponent} from "../modal/base-modal.component";

@Component({
  selector: 'app-simple-popup',
  template: `
<p>Some modal content:<strong>{{someText}}</strong></p>
<div modal-footer>
            <div class="">
                <button type="button" pButton icon="fa-close" (click)="activeModal.dismiss('No, closed')" label="No"></button>
                <button type="button" pButton icon="fa-check" (click)="activeModal.close('Yes, closed')" label="Yes"></button>
            </div>
        </div>
`
})
export class SimplePopupComponent extends BaseModalComponent implements OnInit {

  @Input() someText: string;

  constructor(private activeModal: ActiveModalDialog) {
    super();
  }

  ngOnInit() {
  }

}
