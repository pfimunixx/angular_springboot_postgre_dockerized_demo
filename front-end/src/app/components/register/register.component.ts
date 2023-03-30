import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'component-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  registerForm!:FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      email:['', [
        Validators.required, 
        Validators.email]],
      password:['',[
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

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    alert("Success");
  }
}
