import { take, skip } from 'rxjs';
import {
  errorMessageSelector,
  successMessageSelector,
} from './../cart.selector';
import { UserService } from './../../../Services/user.service';
import { FormBuilder } from '@angular/forms';
import { Product } from './../../../models/product';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { Store, select } from '@ngrx/store';
import { addCart, updateCart } from '../cart.action';
import { validateRequired } from 'src/app/validators';

@Component({
  selector: 'app-crud-cart',
  templateUrl: './crud-cart.component.html',
  styleUrls: ['./crud-cart.component.css'],
})
export class CrudCartComponent {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCart: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  modalType = 'Thêm';

  error: any;
  error$: any;

  products!: Product[];

  users!: User[];

  required = validateRequired;

  cartForm: any = this.fb.group({
    product_id: [''],
    user_id: [''],
    quantity: [0],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private userService: UserService,
    private store: Store
  ) {}

  getProductsList() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getUsersList() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit(): void {
    this.getProductsList();
    this.getUsersList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedCart) {
      this.modalType = 'Sửa';
      this.cartForm.patchValue(this.selectedCart);
    } else {
      this.modalType = 'Thêm';
      this.cartForm.reset();
    }
  }

  closeModal() {
    this.clickClose.emit(true);
    this.cartForm.reset();
    this.error$ = undefined;
  }

  addEditCart() {
    if (!this.cartForm.invalid) {
      this.error$ = undefined;
      this.error = undefined;
      if (this.modalType === 'Thêm') {
        this.store.dispatch(addCart({ payload: this.cartForm.value }));
      } else {
        this.store.dispatch(
          updateCart({ payload: this.cartForm.value, id: this.selectedCart.id })
        );
      }
      this.store
        .pipe(select(successMessageSelector), take(2), skip(1))
        .subscribe((error) => {
          if (error === 'Thêm Thành Công' || error === 'Sửa Thành Công') {
            this.error = error;
            this.closeModal();
          } else {
            this.error = undefined;
          }
        });

      this.store
        .pipe(select(errorMessageSelector), take(2), skip(1))
        .subscribe((error) => {
          if (error) this.error$ = error;
        });

      setTimeout(() => {
        if (this.error$) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Lỗi',
          });
        }
        if (this.error) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.error,
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
}
