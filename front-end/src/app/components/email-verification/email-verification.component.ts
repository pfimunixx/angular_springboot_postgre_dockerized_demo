import { Component } from '@angular/core';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.sass']
})
export class EmailVerificationComponent {

  email !: string;

}
