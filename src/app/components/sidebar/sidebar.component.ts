import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() visibleSidebar1!: any;
  @Output() clickClose = new EventEmitter<any>();

  closeModal() {
    this.clickClose.emit(true);
  }
}
