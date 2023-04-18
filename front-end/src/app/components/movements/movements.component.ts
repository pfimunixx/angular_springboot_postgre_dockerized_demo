import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent {

  public userObject !: User;

  constructor(private router : Router){
    const userString = localStorage.getItem('token');
    if (userString !== null) {
      this.userObject = JSON.parse(userString);
    } else {
      console.log("There was an error getting the user")
      this.router.navigate(['login'])
    }
  }

  ngOnInit(){
    alert(this.userObject.email);
  }
}
