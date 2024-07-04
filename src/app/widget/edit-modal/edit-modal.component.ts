import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  // @ts-ignore
  @ViewChild('codeMirror') codeMirror: any;
  @Input() data: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  widgetId: number;
  query: string;
  paramName: string;
  paramType: string;
  paramTypeList: any[] = [
    {id: '1', value: 'Text'},
    {id: '2', value: 'Date'},
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
  }

  addParams(): void {
    this.addParamsClicked = !this.addParamsClicked;
  }

  onSave(): void {
    this.closeModal.emit();
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

  applyToQuery(param: { id: number; paramType: string; paramName: string }) {
    let cm = this.codeMirror.codeMirror;

    cm.replaceSelection('$$' + param.paramName + '', 'around');
    var from = cm.getCursor('from');
    var to = cm.getCursor('to');
    let mark = cm.markText(from, to, {
      replacedWith: param.id,
      clearWhenEmpty: false
    });

    if (this.enter) {
      this.codeMirror.codeMirror.on(mark, 'beforeCursorEnter', function(): void {
        const direction: string = this.posEq(cm.getCursor(), mark.find().from)
          ? 'left'
          : 'right';
        cm.widgetEnter = (mark, direction) => {
          if (mark.find()) {
            this.enter(direction);
          } else {
            this.cm.refresh();
          }
        };

        cm.widgetEnter(mark, direction);
      });
    }

    cm.setCursor(to);
    cm.refresh();
  }

  enter(node, direction) {
    var t = node.find('.value');
    t.focus();
    if (direction === 'left') {
      t.setCursorPosition(0);
    } else {
      t.setCursorPosition(t.val().length);
    }
  }
}
