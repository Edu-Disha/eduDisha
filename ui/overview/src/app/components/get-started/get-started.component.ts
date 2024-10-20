import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { atLeastOneRequiredValidator } from 'ui/libraries/common-logics/customValidator';
import { ApiGateService } from '../../services/api-gate.service';
@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit ,OnDestroy {
  tabSelected: string = 'SIGNIN';
  tabSwitched: boolean = false;
  signinForm!: FormGroup;
  signupForm!: FormGroup;
  isFormValid: boolean = false;
  formSubscription: any;
  constructor(private readonly fb: FormBuilder, private readonly httpService : ApiGateService) {}

  ngOnInit(): void {
    this.initForms();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  initForms(){
    this.signinForm = this.fb.group({
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^\d+$/)]),
      password: new FormControl('', [Validators.required])
    }, { validators: [atLeastOneRequiredValidator()] });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.formSubscription = this.signinForm.valueChanges.subscribe(() => {
      this.isFormValid = this.signinForm.valid;
    });
  }
  switchTab(tab: string) {
    this.tabSelected = tab;
    this.formSubscription.unsubscribe();
    if(tab === 'SIGNIN'){
      this.formSubscription = this.signinForm.valueChanges.subscribe(() => {
        this.isFormValid = this.signinForm.valid;
      });
      this.isFormValid = this.signinForm.valid;
    }
    else{
      this.formSubscription = this.signupForm.valueChanges.subscribe(() => {
        this.isFormValid = this.signupForm.valid;
      });
      this.isFormValid = this.signupForm.valid;
    }
  }
  submit(){
    if(this.tabSelected === 'SIGNIN'){
      this.httpService.ownerLogin(this.signinForm.value).subscribe((response) => {
        console.log(response);
      });
    }
    else{
      console.log(this.signupForm.value);
    }
  }
}