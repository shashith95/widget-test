import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() data: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  modalRef: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSave(): void {
    // Handle save logic here
    this.closeModal.emit();
  }

  onClose(): void {
    console.log('close button triggered');
    this.closeModal.emit();
  }

}
