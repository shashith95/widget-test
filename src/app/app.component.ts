import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'widget-test';

  summaryCounts: {title: string, count: number}[] = [
    { title: 'Users', count: 1500 },
    { title: 'Orders', count: 320 },
    { title: 'Products', count: 85 }
  ];

  editQuery() {
    confirm("Are you sure?")
  }
}
