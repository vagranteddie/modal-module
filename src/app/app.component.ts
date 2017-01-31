import {Component} from "@angular/core";
import {Modal} from "../modal/modal";
import {SimplePopupComponent} from "./simple-popup.component";

@Component({
  selector: 'app-root',
  template: `
<h1>
  {{title}}
</h1>
<div>
  <button pButton type="button" label="Open dialog" (click)="onOpen()"></button>
  <button pButton type="button" label="Open modal" (click)="onOpenModal()"></button>
</div>
<router-outlet></router-outlet>
<template modalDialogContainer></template>
`,
})
export class AppComponent {
  title = 'app works!';

  constructor(private modal: Modal) {
  }

  onOpen() {
    let mdl = this
      .modal
      .open(SimplePopupComponent, {
        height: 200,
        width: 500,
        header: 'Modal header'
      });
    mdl.componentInstance.someText = 'Some text as param';
    mdl
      .result
      .then(ok => console.log("ok:", ok), (cancel) => console.log('cancel:', cancel));
  }

  onOpenModal() {
    let mdl = this
      .modal
      .open(SimplePopupComponent, {
        header: 'Modal header',
        modal: true
      });
    mdl.componentInstance.someText = 'And here';
    mdl
      .result
      .then(ok => console.log("ok:", ok), (cancel) => console.log('cancel:', cancel));
  }
}
