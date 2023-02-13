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
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true,
    },
  ],
})
export class InputTextareaComponent implements ControlValueAccessor, Validator {
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
