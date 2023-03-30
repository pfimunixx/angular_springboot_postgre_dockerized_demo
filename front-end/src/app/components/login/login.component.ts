import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loginForm!:FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:['', [
        Validators.required, 
        Validators.email]],
      password:['',
        Validators.required]
    })    
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
    alert("Success");
  }
}
