import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataList: { widgetId: number, query: string, widgetType: string }[] = [];

  ngOnInit(): void {
    this.dataList = [
      {widgetId: 1, query: 'select count(*) from table', widgetType: 'score-card'},
      {widgetId: 2, query: 'select count(*) from table', widgetType: 'pie-chart'},
      {widgetId: 3, query: 'select count(*) from table', widgetType: 'column-chart'}
    ];
  }
}
