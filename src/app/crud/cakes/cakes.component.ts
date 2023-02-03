import { Observable } from 'rxjs';
import { cakeSelect, isLoadingSelect } from './cakes.selector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/models/product';
import { Store } from '@ngrx/store';
import { deleteCake, getCakes } from './cakes.action';
import { ExportService } from 'src/app/export.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css'],
})
export class CakesComponent implements OnInit {
  displayAddEditModal = false;
  selectedProduct: any = null;
  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;

  url: string = 'http://127.0.0.1:8000/storage/';

  @ViewChild('dt') table!: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store,
    private messageService: MessageService,
    private exportService: ExportService
  ) {
    this.products$ = this.store.select(cakeSelect);
    this.isLoading$ = this.store.select(isLoadingSelect);
  }
  ngOnInit(): void {
    this.store.dispatch(getCakes());
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      accept: () => {
        this.store.dispatch(deleteCake({ id: product.id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Delete',
          detail: 'Xóa Thành Công',
        });
      },
    });
  }

  export() {
    this.exportService.exportExcelProduct().subscribe((response) => {
      let fileName = 'Danh sách bánh';
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
