import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() widgetTitle: string;
  @Input() data: { widgetId: number, query: string };
  @Input() summaryDataSet: { label: string, value: number }[];
  @Input() savedParamList: { id: number, paramType: string, paramName: string }[];
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  widgetId: number;
  query: string;
  paramName: string;
  paramType: string;
  paramTypeList: any[] = [
    {id: '-1', value: 'Select a param type'},
    {id: '1', value: 'text'},
    {id: '2', value: 'date'},
  ];
  dateColumnList: string[] = ['admitted_date', 'registered_date'];
  config: any = {
    // lineNumbers: true,
    mode: 'text/x-sql',
  };
  addParamsClicked: boolean = false;
  addSummaryDataClicked: boolean = false;
  paramId: number = 0;
  summaryQueryList: { id: number, label: string, query: string, dateColumn: string, fromDate: string, toDate: string }[];
  selectedDateColumn: string;
  selectedLabelName: string;
  selectedQuery: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.widgetId = this.data.widgetId;
    this.query = this.data.query;
    console.log(this.data);
    this.paramType = 'text';
  }

  addParams(): void {
    this.addParamsClicked = !this.addParamsClicked;
  }

  onSave(): void {
    this.closeModal.emit({savedParamList: this.savedParamList, savedSummaryList: this.summaryQueryList});
  }

  onClose(): void {
    console.log('close button triggered');
    this.closeModal.emit();
  }

  onSelect(value: any): void {
    this.paramType = value;
  }

  saveSummaryData(): void {
    if (this.summaryQueryList) {
      this.summaryQueryList.push({
        id: this.paramId++,
        label: this.selectedLabelName,
        query: this.selectedQuery,
        dateColumn: this.selectedDateColumn,
        fromDate: undefined,
        toDate: undefined
      });
    } else {
      this.summaryQueryList = [{
        id: this.paramId++,
        label: this.selectedLabelName,
        query: this.selectedQuery,
        dateColumn: this.selectedDateColumn,
        fromDate: undefined,
        toDate: undefined
      }];
    }
    this.addSummaryDataClicked = !this.addSummaryDataClicked;
    this.selectedLabelName = undefined;
    this.selectedQuery = undefined;
    this.selectedDateColumn = undefined;
  }

  saveParam(): void {
    if (this.savedParamList) {
      this.savedParamList.push({id: this.paramId++, paramType: this.paramType, paramName: this.paramName});
    } else {
      this.savedParamList = [{id: this.paramId++, paramType: this.paramType, paramName: this.paramName}];
    }
    this.addParamsClicked = !this.addParamsClicked;
    this.paramType = undefined;
    this.paramName = undefined;
  }

  remove(param: { id: number; paramType: string; paramName: string }): void {
    const index: number = this.savedParamList.indexOf(param);
    if (index >= 0) {
      this.savedParamList.splice(index, 1);
    }
  }

  applyToQuery(param: { id: number; paramType: string; paramName: string }): void {
    const codeMirrorElement = this.el.nativeElement.querySelector('#query .CodeMirror');
    let cm = codeMirrorElement.CodeMirror;

    // Replace the current selection with the parameter name wrapped in $$ symbols
    cm.replaceSelection(`$$${param.paramName}`, 'around');

    // Get the current cursor position before and after the replacement
    let from = cm.getCursor('from');
    let to = cm.getCursor('to');

    // Create a marker to replace the text with the parameter ID and make it non-clearable
    let mark = cm.markText(from, to, {
      replacedWith: document.createTextNode(`$$${param.paramName}`), // Create text node with param ID
      clearWhenEmpty: false
    });

    // Attach the enter event if it exists
    if (this.widgetEnter) {
      cm.on('beforeCursorEnter', (): void => {
        const direction: string = this.posEq(cm.getCursor(), mark.find().from) ? 'left' : 'right';
        this.widgetEnter(mark, direction, cm);
      });
    }

    // Set the cursor to the end of the replaced text and refresh the editor
    cm.setCursor(to);
    cm.refresh();
  }

  widgetEnter(mark, direction, cm): void {
    if (!mark.find()) {
      cm.refresh();
      return;
    }

    // Find the value node inside the marked text
    let valueNode = mark.find().element.querySelector('.value');
    if (valueNode) {
      valueNode.focus();

      // Set cursor position based on the direction
      if (direction === 'left') {
        valueNode.setSelectionRange(0, 0);
      } else {
        valueNode.setSelectionRange(valueNode.value.length, valueNode.value.length);
      }
    }
  }

  // Helper function to check if two positions are equal
  posEq(pos1, pos2): boolean {
    return pos1.line === pos2.line && pos1.ch === pos2.ch;
  }

  addSummaryData(): void {
    this.addSummaryDataClicked = !this.addSummaryDataClicked;
  }

  onSelectDate(value: any): void {
    this.selectedDateColumn = value;
  }

  editSummaryData(summary: { id: number, label: string, query: string, dateColumn: string }): void {
    this.selectedQuery = summary.query;
    this.selectedLabelName = summary.label;
    this.selectedDateColumn = summary.dateColumn;
  }

  deleteSummaryData(summary: { id: number, label: string, query: string, dateColumn: string, fromDate: string, toDate: string }): void {
    const index: number = this.summaryQueryList.indexOf(summary);
    if (index >= 0) {
      this.summaryQueryList.splice(index, 1);
    }
  }
}
