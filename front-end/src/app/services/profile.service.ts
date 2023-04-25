import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../domain/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUserProfiles(user_id : number): Observable<any> {
    return this.http.get<Profile[]>(`${this.apiServerUrl}/profile/${user_id}/all`);
  }

  public getProfileById(profileId : number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiServerUrl}/profile/find/${profileId}`);
  }

  public updateProfile(profile : Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiServerUrl}/profile/update`, profile);
  }

  public addProfile(profile : Profile){
    return this.http.post<Profile>(`${this.apiServerUrl}/profile/add`, profile);
  }

  public deleteProfile(profileId : number) {
    return this.http.delete<void>(`${this.apiServerUrl}/profile/delete/${profileId}`);
  }
}
