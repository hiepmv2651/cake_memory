import { categorySelector, isLoadingSelector } from './category.selector';
import { Table } from 'primeng/table';
import { Category } from './../../models/category';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { deleteCategory, getCategory } from './category.action';
import { ExportService } from 'src/app/export.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories: Category[] = [];
  displayAddEditModal = false;
  selectedCategory: any = null;

  @ViewChild('dt') table!: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store,
    private exportService: ExportService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(getCategory());
  }

  category$ = this.store.select(categorySelector);
  isLoading$ = this.store.select(isLoadingSelector);

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedCategory = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  showEditModal(category: Category) {
    this.displayAddEditModal = true;
    this.selectedCategory = category;
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      accept: () => {
        this.store.dispatch(deleteCategory({ id: id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Delete',
          detail: 'Xóa Thành Công',
        });
      },
    });
  }

  export() {
    this.exportService.exportExcelCategory().subscribe((response) => {
      let fileName = 'Danh sách loại bánh';
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
