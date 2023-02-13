import { Component, Input, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor, Validator {
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
