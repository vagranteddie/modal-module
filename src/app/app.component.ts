import {Component} from "@angular/core";
import {Modal} from "../modal/modal";
import {SimplePopupComponent} from "./simple-popup/simple-popup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(private modal: Modal) {
  }

  onOpenModal() {
    this.modal
        .open(SimplePopupComponent, {
          height: 200,
          width: 500,
          header: 'Modal header'
        })
        .result
        .then(ok => console.log("ok:", ok), (cancel) => console.log('cancel:', cancel));
  }
}
