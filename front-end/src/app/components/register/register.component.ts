import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../domain/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'component-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {


  constructor(private formBuilder: FormBuilder, private userService: UserService){}

  ngOnInit(){

    
  }

  onRegisterUser(registerForm: NgForm){    
    this.userService.addUser(registerForm.value).subscribe(
      (response: User) => {
        console.log(response);
        alert("User registered!")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
