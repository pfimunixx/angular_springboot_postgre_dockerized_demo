import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domain/user';
import { Profile } from '../domain/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {  }

  public getUsers(): Observable<any>{
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/user/find/email/${email}`);
  }

  public login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.http.post<User>(`${this.apiServerUrl}/user/login`, body.toString(), { headers: headers });
  }

  public addProfile(userId : number, profile : Profile) : Observable<Profile> {
    return this.http.post<Profile>(`${this.apiServerUrl}/user/${userId}/add-profile`, profile);
  }
}
