import { addCake, updateCake } from './../cakes.action';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/models/category';
import { Store, select } from '@ngrx/store';
import { errorMessageSelect, successMessageSelect } from '../cakes.selector';
import { skip, take } from 'rxjs';

import { validateRequired, validateMinLength } from '../../../validators';

@Component({
  selector: 'app-crud-cake',
  templateUrl: './crud-cake.component.html',
  styleUrls: ['./crud-cake.component.css'],
})
export class CrudCakeComponent {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalType = 'Thêm';

  required = validateRequired;
  minLength = validateMinLength(3);

  error: any;
  error$: any;

  categories!: Category[];

  productForm: any = this.fb.group({
    name: [''],
    price: [0],
    detail: [''],
    category_id: [''],
    image: [''],
    quantity: [''],
  });
  constructor(
    public fb: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private store: Store
  ) {}

  getCategoriesList() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProduct) {
      this.modalType = 'Sửa';
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.modalType = 'Thêm';
      this.productForm.reset();
    }
  }

  closeModal() {
    this.clickClose.emit(true);
    this.productForm.reset();
    this.error = undefined;
  }

  submitForm() {
    if (!this.productForm.invalid) {
      this.error$ = undefined;
      this.error = undefined;

      const formData = new FormData();

      formData.append('image', this.productForm.get('image').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('detail', this.productForm.get('detail').value);
      formData.append('category_id', this.productForm.get('category_id').value);
      formData.append('quantity', this.productForm.get('quantity').value);

      if (this.modalType === 'Thêm') {
        this.store.dispatch(addCake({ payload: formData }));
      } else {
        this.store.dispatch(
          updateCake({
            payload: formData,
            id: this.selectedProduct.id,
          })
        );
      }

      this.store
        .pipe(select(successMessageSelect), take(2), skip(1))
        .subscribe((error) => {
          if (error === 'Thêm Thành Công' || error === 'Sửa Thành Công') {
            this.error$ = error;
            this.closeModal();
          } else {
            this.error$ = undefined;
          }
        });

      this.store
        .pipe(select(errorMessageSelect), take(2), skip(1))
        .subscribe((error) => {
          if (error) this.error = error;
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
        }
      }, 500);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vui lòng nhập đầy đủ thông tin',
      });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')?.setValue(file);
    }
  }
}
