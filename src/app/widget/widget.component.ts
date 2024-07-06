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
  summaryDataSet: { label: string, value: number }[] = [];
  selectedData: { widgetId: number, query: string };
  modalRef: BsModalRef | null;
  savedParamList: { id: number, paramType: string, paramName: string }[];
  savedSummaryList: { id: number, label: string, query: string, dateColumn: string, fromDate: string, toDate: string }[];
  fromDate: string;
  toDate: string;
  widgetTitle: string = 'This is widget Title';

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    console.log(this.widgetId + ' | ' + this.query);
    this.summaryDataSet = [
      {label: 'Summary', value: 15000},
      {label: 'Count', value: 20000}
    ];
  }

  editQuery(): void {
    this.selectedData = {widgetId: this.widgetId, query: this.query};
    const initialState: any = {
      data: this.selectedData,
      summaryDataSet: this.summaryDataSet,
      savedParamList: this.savedParamList,
      widgetTitle: this.widgetTitle
    };

    this.modalRef = this.modalService.show(EditModalComponent, {initialState, class: 'my-custom-modal modal-lg'});

    this.modalRef.content.closeModal.subscribe(
      (data: {
        savedParamList: { id: number, paramType: string, paramName: string }[],
        savedSummaryList: { id: number, label: string, query: string, dateColumn: string, fromDate: string, toDate: string }[]
      }): void => {
        if (data) {
          this.savedParamList = data.savedParamList;
          this.savedSummaryList = data.savedSummaryList;
        }
        this.modalRef.hide();
      });
  }
}
