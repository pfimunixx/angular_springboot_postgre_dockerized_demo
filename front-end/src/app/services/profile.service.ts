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

  public getProfiles(user_id : number): Observable<any> {
    return this.http.get<Profile[]>(`${this.apiServerUrl}/profile/${user_id}/all`);
  }
}
