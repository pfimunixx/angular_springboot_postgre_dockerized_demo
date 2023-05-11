import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { Sha256 } from 'src/app/encrypt/sha-256';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.sass']
})
export class PasswordRestoreComponent {

  passwordRestoreForm !: FormGroup
  submitted = false;
  newPasswordUser !: User;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    const userCode = this.route.snapshot.paramMap.get('userCode');
    if(userCode){
      this.userService.getUserByUserCode(userCode).subscribe(
        (response : User) => {
          console.log(response);
          this.newPasswordUser = response;
        },
        (error : HttpErrorResponse) => {
          console.log(error.message);
          this.router.navigate(['']);
        }
      )
    }
    this.passwordRestoreForm = this.formBuilder.group({
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
    if(this.passwordRestoreForm.invalid){
      return
    }
    this.newPasswordUser.password = Sha256.encrypt(this.passwordRestoreForm.controls['password'].value.toString());
    this.userService.updateUser(this.newPasswordUser).subscribe(
      (response : User) => {
        console.log(response);
        alert("Password successfuly restored!");
        this.router.navigate(['']);
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
