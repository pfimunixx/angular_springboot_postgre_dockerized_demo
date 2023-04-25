import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { Sha256 } from 'src/app/encrypt/sha-256';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  public loginUser!: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router : Router){}

  ngOnInit(){
  
  }
  onSubmit(loginForm: NgForm){
    this.userService.login(loginForm.controls['email'].value, Sha256.encrypt(loginForm.controls['password'].value)).subscribe(
      (response: User) => {
        localStorage.setItem('loggedUserId', response.id.toString());
        localStorage.setItem('selectedProfileId',response.selectedProfileId.toString())
        this.router.navigate(['user-portal']);

      },
      (error: HttpErrorResponse) => {
        alert("Incorrect username or password");
      }
    );
  }
}
