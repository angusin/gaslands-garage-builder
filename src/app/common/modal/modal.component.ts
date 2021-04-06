import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modalIsActive: boolean = false;
  @Output() deactivateModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  toggleModal(): void {
    this.modalIsActive = !this.modalIsActive;
  }

  sendDeactivateModal() {
    this.deactivateModal.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    evt: KeyboardEvent
  ) {
    this.modalIsActive = false;
    this.sendDeactivateModal();
  }

  @HostListener('click', ['$event'])
  function(event: any) {
    if (event.target.id === 'modal') {
      this.sendDeactivateModal();
    }
  }
}
