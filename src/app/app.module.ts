import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ModalModule} from "../modal/modal.module";
import {SimplePopupComponent} from "./simple-popup.component";
import {ButtonModule} from "primeng/components/button/button";

@NgModule({
  declarations: [
    AppComponent,
    SimplePopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SimplePopupComponent]
})
export class AppModule {
}
