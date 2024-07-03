import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widgetId: number;
  @Input() query: string;
  @Input() widgetType: string;

  constructor() { }

  ngOnInit() {
    console.log(this.widgetId + ' | ' + this.query);
  }

  editQuery() {

  }
}
