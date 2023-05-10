import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent {

  passwordResetForm !: FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.passwordResetForm = this.formBuilder.group({
      password:['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-]).{8,}$')]],
        passwordConfirm:['',[
          Validators.required]]
      }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const passwordConfirmControl = formGroup.get('passwordConfirm');
    if (passwordControl && passwordConfirmControl) {
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({ mismatch: true });
      } else {
        passwordConfirmControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.passwordResetForm.invalid){
      return
    }
  }

}
