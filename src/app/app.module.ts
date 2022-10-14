import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventViewComponent } from './event-view/event-view.component';
import { InviteViewComponent } from './invite-view/invite-view.component';


@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    HomePageComponent,
    RegistrationComponent,
    NewEventComponent,
    EventViewComponent,
    InviteViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
