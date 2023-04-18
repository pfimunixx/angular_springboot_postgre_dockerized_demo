import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from 'src/app/domain/profile';
import { User } from 'src/app/domain/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.sass']
})
export class ProfilesComponent {

  public profiles !: Profile[];
  public currentUserId !: number;

  constructor(private userService: UserService, private profileService: ProfileService){}

  ngOnInit() {
    document.getElementById('add-profile-form')!.click();
    const userJson = localStorage.getItem('token')!;
    const currentUser = JSON.parse(userJson);
    this.currentUserId = currentUser.id;
    this.getProfiles(currentUser.id);
  }

  public getProfiles(user_id : number):void {
    this.profileService.getProfiles(user_id).subscribe(
      (respose: Profile[]) => {
        this.profiles = respose;
        console.log(this.profiles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProfile(addForm: NgForm): void {
    document.getElementById('add-profile-form')!.click();
    this.userService.addProfile(this.currentUserId,addForm.value).subscribe(
      (response: Profile) => {
        console.log(response);
        addForm.reset();
        this.getProfiles(this.currentUserId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(profile : Profile | null, mode: string): void {
    const container = document.getElementById('profiles')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProfileModal');
    }
    container.appendChild(button);
    button.click();
  }

 
}
