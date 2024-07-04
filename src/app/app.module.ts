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
import {HighchartsChartModule} from 'highcharts-angular';
import {ColumnChartComponent} from './widget/column-chart/column-chart.component';
import {PieChartComponent} from './widget/pie-chart/pie-chart.component';
import {SummaryCardComponent} from './widget/summary-card/summary-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    EditModalComponent,
    ColumnChartComponent,
    PieChartComponent,
    SummaryCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ModalModule.forRoot(),
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  entryComponents: [EditModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
