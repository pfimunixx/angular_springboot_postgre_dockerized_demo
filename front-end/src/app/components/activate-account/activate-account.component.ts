import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.sass']
})
export class ActivateAccountComponent {

  constructor(private route: ActivatedRoute, private router: Router, private userService : UserService){}
  
  ngOnInit() {
    const userCode = this.route.snapshot.paramMap.get('userCode');
    if(userCode) {
      this.userService.getUserByUserCode(userCode).subscribe(
        (response : User) => {
          console.log(response);
          response.activated = true;
          this.userService.updateUser(response).subscribe(
            (response : User) => {
              console.log(response);
              alert("Account successfuly activated!");
              this.router.navigate(['']);
            },
            (error : HttpErrorResponse) => {
              console.log(error.message);
              alert("Something went wrong");
              this.router.navigate(['']);
            }
          )
        },
        (error : HttpErrorResponse) => {
          console.log(error.message);
          this.router.navigate(['']);
        }
      )
    }
  }

}
