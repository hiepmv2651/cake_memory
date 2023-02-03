import { CartUserService } from './../../Services/cart-user.service';
import { Product } from './../../models/product';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  header!: string;

  count: number = 0;

  price: any;

  cart: any;

  products!: Product[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  sortKey!: Product;

  loading: boolean = true;

  displayCard: boolean = false;

  constructor(
    private productService: ProductService,
    private primengConfig: PrimeNGConfig,
    private cartUserService: CartUserService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.primengConfig.ripple = true;
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  showAddCart(id: any) {
    this.displayCard = true;
    this.price = this.products[id - 1];
  }

  hide() {
    this.displayCard = false;
    this.count = 0;
  }

  addCart() {
    this.cart = {
      product_id: this.price.id,
      user_id: localStorage.getItem('id'),
      quantity: this.count,
      price: this.price.price * this.count,
    };
    this.cartUserService.addUserCart(this.cart).subscribe(
      (data) => {
        this.hide();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Thêm thành công',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      }
    );
  }
  sum!: number;
  priceCake() {
    this.sum = this.count ? this.price?.price * this.count : 0;
  }
}
