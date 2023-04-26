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

  public loggedUser !: User;
  public profiles !: Profile[];
  public addProfile !: Profile;
  public deleteProfile ?: Profile;
  public editProfile ?: Profile;
  public userDataLoaded : boolean = false;

  constructor(private userService: UserService, private profileService: ProfileService){}

  ngOnInit() {
    this.getLoggedUser();
    this.getProfiles();
  }

  public async getProfiles():Promise<void> {
    await this.waitForUserDataLoaded();
    this.profileService.getUserProfiles(this.loggedUser.id).subscribe(
      (respose: Profile[]) => {
        this.profiles = respose;
        console.log(this.profiles);
        this.userDataLoaded = false;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getLoggedUser() {
    this.userDataLoaded = false;
    this.userService.getUserById(parseInt(localStorage.getItem('loggedUserId')!)).subscribe(
      (response : User) => {
        console.log(response);
        this.loggedUser = response;
        this.userDataLoaded = true;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddProfile(addProfileForm: NgForm): void {
    document.getElementById('add-profile-form')!.click();
    this.addProfile = addProfileForm.value;
    this.addProfile.user = this.loggedUser;
    console.log(addProfileForm.value);
    this.profileService.addProfile(this.addProfile).subscribe(
      (response: Profile) => {
        console.log(response);
        addProfileForm.reset();
        this.getProfiles();
        this.onSelectProfile(response.id);
        localStorage.setItem('selectedProfileId', response.id.toString());
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addProfileForm.reset();
      }
    );
  }

  public onDeleteProfile(profileId: number): void {
    this.profileService.deleteProfile(profileId).subscribe(
      (response: void) => {
        console.log(response);
        if(this.loggedUser.selectedProfileId === profileId){
          this.loggedUser.selectedProfileId = 0;
          this.userService.updateUser(this.loggedUser).subscribe(
            (response : User) => { 
              console.log(response);
              this.getLoggedUser();
              localStorage.setItem('selectedProfileId', "0")
            },
            (error : HttpErrorResponse) => {
              alert(error.message);
            }
          )
        }
        this.getProfiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProfile(profile : Profile): void {
    profile.user = this.loggedUser;
    this.profileService.updateProfile(profile).subscribe(
      (response: Profile) => {
        console.log(response);
        this.getProfiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }      
    );
  }

  public onSelectProfile(profileId : number) {
    this.loggedUser.selectedProfileId = profileId;
    this.userService.updateUser(this.loggedUser).subscribe(
      (response : User) => {
        console.log(response);
        this.getLoggedUser();
        this.getProfiles();
        localStorage.setItem('selectedProfileId', response.selectedProfileId.toString())
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
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
    if (mode === 'delete') {
      this.deleteProfile = profile!;
      button.setAttribute('data-target', '#deleteProfileModal');
    }
    if (mode === 'edit') {
      this.editProfile = profile!;
      button.setAttribute('data-target', '#editProfileModal');
    }
    container.appendChild(button);
    button.click();
  }

  waitForUserDataLoaded(): Promise<void> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (this.userDataLoaded) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  }
 
}
