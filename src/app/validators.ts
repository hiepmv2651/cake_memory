import { Validators, FormControl, ValidationErrors } from '@angular/forms';

export function validateRequired(
  control: FormControl
): ValidationErrors | null {
  return Validators.required(control);
}

export function validateMinLength(
  control: FormControl
): ValidationErrors | null {
  return Validators.minLength(3)(control);
}

export function validateNumber(control: FormControl): ValidationErrors | null {
  return Validators.pattern('^[0-9]*$')(control);
}

export function validateEmail(control: FormControl): ValidationErrors | null {
  return Validators.email(control);
}

export function validatePassword(
  control: FormControl
): ValidationErrors | null {
  return Validators.pattern(
    '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/'
  )(control);
}
