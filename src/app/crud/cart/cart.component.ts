import { ExportService } from './../../export.service';
import { cartSelector, isLoadingSelector } from './cart.selector';

import { Table } from 'primeng/table';
import { Cart } from './../../models/cart';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { deleteCart, getCart } from './cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  carts: Cart[] = [];
  displayAddEditModal = false;
  selectedCart: any = null;

  @ViewChild('dt') table!: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store,
    private exportService: ExportService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(getCart());
  }

  cart$ = this.store.pipe(select(cartSelector));
  isLoading$ = this.store.pipe(select(isLoadingSelector));

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedCart = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  showEditModal(cart: Cart) {
    this.displayAddEditModal = true;
    this.selectedCart = cart;
  }

  deleteCart(cart: Cart) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      accept: () => {
        this.store.dispatch(deleteCart({ id: cart.id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Delete',
          detail: 'Xóa Thành Công',
        });
      },
    });
  }

  export() {
    this.exportService.exportExcelCart().subscribe((response) => {
      let fileName = 'Danh sách giỏ hàng';
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
