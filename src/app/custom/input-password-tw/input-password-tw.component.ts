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
  selector: 'app-input-password-tw',
  templateUrl: './input-password-tw.component.html',
  styleUrls: ['./input-password-tw.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordTwComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputPasswordTwComponent),
      multi: true,
    },
  ],
})
export class InputPasswordTwComponent
  implements ControlValueAccessor, Validator
{
  validate(control: FormControl) {
    if (this.validators) {
      return Validators.compose(this.validators)!(control);
    }
    return null;
  }
  @Input() placeHolder!: string;
  @Input() styleLabel: any;
  @Input() styleInput: any;

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
      } else if (this.formControl.errors?.['pattern']) {
        return `${this.label} must contain at least one uppercase letter, one lowercase letter, one special letter, and one number.`;
      } else if (this.formControl.errors?.['notMatch']) {
        return 'Password and Confirm Password must be the same';
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
}
