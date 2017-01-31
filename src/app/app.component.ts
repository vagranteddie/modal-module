import {Component} from "@angular/core";
import {Modal} from "../modal/modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(private modal: Modal) {
  }
}
