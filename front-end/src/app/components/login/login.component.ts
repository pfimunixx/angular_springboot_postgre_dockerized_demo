import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  public loginUser!: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService){}

  ngOnInit(){
  
  }
  onSubmit(loginForm: NgForm){
    this.userService.login(loginForm.controls['email'].value, loginForm.controls['password'].value).subscribe(
      (response: User) => {
        alert("Login succed!");
      },
      (error: HttpErrorResponse) => {
        alert("Incorrect username or password");
      }
    );
  }
}
