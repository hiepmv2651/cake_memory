import { addCake, updateCake } from './../cakes.action';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/models/category';
import { Store, select } from '@ngrx/store';
import { errorMessageSelect, successMessageSelect } from '../cakes.selector';
import { skip, take } from 'rxjs';

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

  error: any;
  error$: any;

  categories!: Category[];

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    detail: [''],
    category_id: ['', Validators.required],
    image: ['', Validators.required],
    quantity: ['', Validators.required],
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
    this.error$ = undefined;
    this.error = undefined;

    if (this.modalType === 'Thêm') {
      this.store.dispatch(addCake({ payload: this.productForm.value }));
    } else {
      this.store.dispatch(
        updateCake({
          payload: this.productForm.value,
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
  }
}
