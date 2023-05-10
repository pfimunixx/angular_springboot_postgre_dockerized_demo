import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../domain/user';
import { Profile } from '../../domain/profile'
import { HttpErrorResponse } from '@angular/common/http';
import { Sha256 } from 'src/app/encrypt/sha-256';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'component-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  registerUser !: User
  registerForm!:FormGroup
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private profileService: ProfileService, private router : Router){}

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

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    this.registerUser = this.registerForm.value;
    this.registerUser.password = Sha256.encrypt(this.registerUser.password);
    this.registerUser.activated = false;
    this.userService.getUserByEmail(this.registerUser.email).subscribe(
      (response : User) => {
        console.log(response)
        alert("This email is already registered! Try with another one");
      },
      () => {
        this.userService.addUser(this.registerUser).subscribe(
          (response: User) => {
            console.log(response);
            const profile: Profile = {
              id : 0,
              name: "Profile01",
              user: response
            }
            this.profileService.addProfile(profile).subscribe(
              (response : Profile) => {
                console.log(response);
                response.user.selectedProfileId = response.id;
                this.userService.updateUser(response.user).subscribe(
                  (response : User) => {
                    console.log(response);
                    alert("Thank you for registering!");
                    this.router.navigate(['login']);
                  },
                  (error : HttpErrorResponse) => {
                    console.log(error.message)
                  }
                )
              },
              (error : HttpErrorResponse) => {
                alert(error.message)
              }
            )
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
