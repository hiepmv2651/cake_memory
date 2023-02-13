import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CartComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CartComponent),
      multi: true,
    },
  ],
})
export class CartComponent implements ControlValueAccessor, Validator {
  validate(control: FormControl) {
    if (this.validators) {
      return Validators.compose(this.validators)!(control);
    }
    return null;
  }

  @Input() label!: string;
  @Input() formControl!: FormControl;

  @Input() error: any;

  @Input() validators!: any[];

  onChange!: (value: any) => void;
  onTouched!: () => void;

  get isInvalid() {
    return this.formControl?.invalid && this.formControl?.touched;
  }

  get errorMessage() {
    if (this.formControl.errors) {
      if (this.formControl.errors?.['required']) {
        return `${this.label} is required`;
      } else if (this.formControl.errors?.['minlength']) {
        return `${this.label} must be at least ${this.formControl.errors['minlength'].requiredLength} characters`;
      } else if (this.formControl.errors?.['pattern']) {
        return `${this.label} must contain only numeric characters`;
      }
    }
    return '';
  }

  writeValue(value: any): void {
    if (this.formControl && this.formControl.value != value)
      this.formControl?.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  count: number = 1;
  sum!: number;
  price: any;

  priceCake() {
    if (this.count >= 1 && this.count <= 20) {
      this.sum = this.count ? this.price?.price * this.count : 0;
    }
  }
}
