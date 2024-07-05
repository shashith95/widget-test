import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @ViewChild('codeMirror', {static: true}) codeMirror: any;
  @Input() data: any;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  widgetId: number;
  query: string;
  paramName: string;
  paramType: string;
  paramTypeList: any[] = [
    {id: '1', value: 'text'},
    {id: '2', value: 'date'},
  ];
  config: any = {
    // lineNumbers: true,
    mode: 'text/x-sql',
  };
  addParamsClicked: boolean = false;
  savedParamList: { id: number, paramType: string, paramName: string }[] = [];

  constructor() {
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
    this.closeModal.emit(this.savedParamList);
  }

  onClose(): void {
    console.log('close button triggered');
    this.closeModal.emit();
  }

  onSelect(value: any): void {
    this.paramType = value;
  }

  saveParam(): void {
    this.savedParamList.push({id: 1, paramType: this.paramType, paramName: this.paramName});
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
    let cm = this.codeMirror.codeMirror;

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
        this.widgetEnter(mark, direction);
      });
    }

    // Set the cursor to the end of the replaced text and refresh the editor
    cm.setCursor(to);
    cm.refresh();
  }

  widgetEnter(mark, direction): void {
    if (!mark.find()) {
      this.codeMirror.codeMirror.refresh();
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
}
