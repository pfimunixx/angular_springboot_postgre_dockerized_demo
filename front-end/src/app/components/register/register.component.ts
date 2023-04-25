import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../domain/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Sha256 } from 'src/app/encrypt/sha-256';

@Component({
  selector: 'component-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  registerUser !: User

  constructor(private userService: UserService){}

  onRegisterUser(registerForm: NgForm){
    this.registerUser = registerForm.value;
    this.registerUser.password = Sha256.encrypt(this.registerUser.password);
    this.userService.getUserByEmail(this.registerUser.email).subscribe(
      (response : User) => {
        console.log(response)
        alert("This email is already registered! Try with another one");
      },
      () => {
        this.userService.addUser(this.registerUser).subscribe(
          (response: User) => {
            console.log(response);
            alert("User registered!")
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    )
  }

}
