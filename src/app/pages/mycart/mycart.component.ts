import { CartService } from './../../Services/cart.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CartUserService } from './../../Services/cart-user.service';
import { Cart } from 'src/app/models/cart';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css'],
})
export class MycartComponent implements OnInit {
  constructor(
    private cartUserService: CartUserService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  quantityControl = this.fb.group({
    quantity: [
      '',
      [Validators.required, Validators.min(1), Validators.max(20)],
    ],
  });

  price: any;
  sumPrice = 0;
  getCartList() {
    this.sumPrice = 0;
    this.cartUserService.getUserCart().subscribe((response) => {
      this.carts = response;
      this.loading = false;
      this.carts.forEach(
        (cart: Cart) =>
          (this.sumPrice = Number(this.sumPrice) + Number(cart.price))
      );
    });
  }

  payForm: any = this.fb.group({
    number: ['', Validators.required],
    exp_month: ['', Validators.required],
    exp_year: ['', Validators.required],
    cvc: ['', Validators.required],
    amount: ['', Validators.required],
    description: ['success'],
  });

  count1!: number;
  count2!: any;

  edit: any;

  cartUser: any;

  displayCard: boolean = false;

  displayUserCart: boolean = false;

  carts: Cart[] = [];

  loading: boolean = true;

  errors: any;

  loadingPage = false;

  pay() {
    this.loadingPage = true;
    this.cartUserService
      .payUserCart(this.payForm.value)
      .subscribe((response) => {
        this.errors = response;
        if (this.errors?.status === 201) {
          this.hide();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.errors?.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errors?.message,
          });
        }
        this.loadingPage = false;
      });

    this.getCartList();
    this.sum = 0;
  }

  show() {
    this.displayCard = true;
  }

  hide() {
    this.displayCard = false;
  }

  showEditUserCart(cart: any) {
    this.displayUserCart = true;
    this.cartUser = cart;
    this.count1 = cart.quantity;
    this.price = cart.price;
  }

  hideCart() {
    this.displayUserCart = false;
    this.count2 = '';
    this.sum = '';
  }

  editUserCart() {
    if (!this.quantityControl.invalid) {
      this.edit = {
        quantity: this.count2,
      };
      this.cartUserService
        .editUserCart(this.cartUser.id, this.edit)
        .subscribe((res) => {
          this.getCartList();
          this.hideCart();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Cart update successfully',
          });
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Số lượng phải trong khoảng từ 1 đến 20',
      });
    }
  }

  deleteCart(cart: Cart) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.cartService.deleteCart(cart.id).subscribe(
          (response) => {
            this.getCartList();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Cart deleted successfully',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Cart not deleted',
            });
          }
        );
      },
    });
  }
  sum: any;

  priceCake() {
    this.sum = (this.price / this.count1) * this.count2;
  }
}
