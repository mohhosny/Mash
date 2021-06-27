import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: [null,Validators.required],
      emailID: [null,[Validators.required,Validators.email,Validators.minLength(10)]],
      txtPassword: [null,[Validators.required,Validators.minLength(7)]],
      txtConfirmPassword: [null,[Validators.required]],
      txtMobile: [null,[Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
    }, {validator: this.MustMatch('txtPassword', 'txtConfirmPassword')});
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

  passwordMatchingValidatior(fg : FormGroup): Validators {
      return fg.get('txtPassword').value === fg.get('txtConfirmPassword').value ? null : {notmatched: true};
  }

  OnSubmit(){
    // console.log(fg.get('txtPassword').value);
    if (this.registerForm.invalid) {
      return;
  }
    //  alert (this.passwordMatchingValidatior());
  }
  get userName() {
    return this.registerForm.get('userName') ;
  }
  get txtPassword() {
    return this.registerForm.get('txtPassword') ;
  }
  get txtConfirmPassword() {
    return this.registerForm.get('txtConfirmPassword') ;
  }
}
