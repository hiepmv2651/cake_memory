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
  selector: 'app-input-text-tw',
  templateUrl: './input-text-tw.component.html',
  styleUrls: ['./input-text-tw.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextTwComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextTwComponent),
      multi: true,
    },
  ],
})
export class InputTextTwComponent implements ControlValueAccessor, Validator {
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
  @Input() read!: boolean;

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
      } else if (this.formControl.errors?.['email']) {
        return `${this.label} must be a valid email`;
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
}
