import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-reset.component.html',
  styleUrls: ['./send-password-reset.component.sass']
})
export class SendPasswordResetComponent {

  public sendPasswordResetForm !: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.sendPasswordResetForm = this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.email
      ]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.sendPasswordResetForm.invalid) {
      return
    }
  }
  
}
