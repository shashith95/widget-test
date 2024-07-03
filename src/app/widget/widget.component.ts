import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EditModalComponent} from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widgetId: number;
  @Input() query: string;
  @Input() widgetType: string;
  widgetDataSet: { label: string, value: number }[] = [];
  selectedData: { widgetId: number, query: string };
  modalRef: BsModalRef | null;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    console.log(this.widgetId + ' | ' + this.query);
    this.widgetDataSet = [
      {label: 'Summary', value: 15000},
      {label: 'Count', value: 20000}
    ];
  }

  editQuery(): void {
    this.selectedData = {widgetId: this.widgetId, query: this.query};
    const initialState = {
      data: this.selectedData,
    };

    this.modalRef = this.modalService.show(EditModalComponent, {initialState}); // Show modal with component and initial state

    this.modalRef.content.closeModal.subscribe(() => {
      console.log('Modal closed');
      this.modalRef.hide();
    });
  }
}
