import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.sass']
})
export class UserPortalComponent {

  inactivityPeriod: number = 300000;
  timeout !: any;
  componentName = 'movements';
  movementsActive : boolean = true;
  profilesActive : boolean = false;
  insightsActive : boolean = false;

  constructor(private router : Router){
    this.resetTimeout();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  onUserActivity() {
    this.resetTimeout();
  }
  
  resetTimeout() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['login'])
    }, this.inactivityPeriod);
  }

  onLogOut() : void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  switchToMovements() {
    this.componentName = 'movements';
    this.movementsActive = true;
    this.profilesActive = false;
    this.insightsActive = false;
  }

  switchToProfiles() {
    this.componentName = 'profiles';
    this.profilesActive = true;
    this.movementsActive = false;
    this.insightsActive = false;
  }

  switchToInsights() {
    this.componentName = 'insights';
    this.profilesActive = false;
    this.movementsActive = false;
    this.insightsActive = true;
  }

}
