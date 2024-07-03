import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WidgetComponent} from './widget/widget.component';
import {EditModalComponent} from './widget/edit-modal/edit-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [],
  entryComponents: [EditModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
