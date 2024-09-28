import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
})
export class GetStartedComponent {
  signinForm: FormGroup;
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      phone : new FormControl('', [Validators.required , Validators.pattern('^[0-9]*$')]),
      password : new FormControl('', [Validators.required]),
    });
    this.signinForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
  }
}