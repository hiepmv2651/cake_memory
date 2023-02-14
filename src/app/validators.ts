import {
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

export function validateRequired(
  control: FormControl
): ValidationErrors | null {
  return Validators.required(control);
}

export function validateMinLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return Validators.minLength(minLength)(control);
  };
}

export function validateMaxLength(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return Validators.maxLength(maxLength)(control);
  };
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
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/;
  return Validators.pattern(passwordPattern)(control);
}

export function validateConfirmPassword(
  control: FormControl
): ValidationErrors | null {
  if (!control.parent) {
    return null;
  }
  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('password_confirmation');
  if (!password || !confirmPassword) {
    return null;
  }
  if (confirmPassword.value === '') {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return { notMatch: true };
}
