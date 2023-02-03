import { take, skip } from 'rxjs';
import { updateCategory } from './../category.action';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { addCategory } from '../category.action';
import {
  errorMessageSelector,
  successMessageSelector,
} from '../category.selector';

@Component({
  selector: 'app-crud-category',
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.css'],
})
export class CrudCategoryComponent {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCategory: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalType = 'Thêm';

  error: any;
  error$: any;

  categoryForm = this.fb.group({
    name: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedCategory) {
      this.modalType = 'Sửa';
      this.categoryForm.patchValue(this.selectedCategory);
    } else {
      this.modalType = 'Thêm';
      this.categoryForm.reset();
    }
  }

  closeModal() {
    this.clickClose.emit(true);
    this.categoryForm.reset();
    this.error = undefined;
  }

  addEditProduct() {
    this.error = undefined;
    this.error$ = undefined;
    if (this.modalType === 'Thêm') {
      this.store.dispatch(addCategory({ payload: this.categoryForm.value }));
    } else {
      this.store.dispatch(
        updateCategory({
          payload: this.categoryForm.value,
          id: this.selectedCategory.id,
        })
      );
    }
    this.store
      .pipe(select(successMessageSelector), take(2), skip(1))
      .subscribe((error) => {
        console.log('Success: ', error);
        if (error) {
          this.error$ = error;
          this.closeModal();
        }
      });

    this.store
      .pipe(select(errorMessageSelector), take(2), skip(1))
      .subscribe((error) => {
        console.log('Failure: ', error);
        if (error) {
          this.error = error;
        }
      });

    setTimeout(() => {
      if (this.error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Lỗi',
        });
      }
      if (this.error$) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.error$,
        });
        this.error$ = undefined;
      }
    }, 500);
  }
}
