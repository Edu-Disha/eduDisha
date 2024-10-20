import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email');
    const phone = control.get('phone');

    if ((email && email.value) || (phone && phone.value)) {
      return null; // Valid if either email or phone has a value
    }

    return { atLeastOneRequired: true }; // Invalid if both are empty
  };
}