import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ajaxPrefilter, error } from 'jquery';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-restore.component.html',
  styleUrls: ['./send-password-restore.component.sass']
})
export class SendPasswordRestoreComponent {

  public sendPasswordRestoreForm !: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router : Router){}

  ngOnInit() {
    this.sendPasswordRestoreForm = this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.email
      ]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.sendPasswordRestoreForm.invalid) {
      return
    }
    const emailValue = this.sendPasswordRestoreForm.controls['email'].value.toString();
    this.userService.sendPaswordRestore(emailValue).subscribe(
      () => {
        alert("Check your mail inbox to restore the password!");
        this.router.navigate([''])
      },
      (error: HttpErrorResponse)  => {
        console.log(error.message);
        alert("There's no user registered with this email");
      }
    )
  }
  
}
