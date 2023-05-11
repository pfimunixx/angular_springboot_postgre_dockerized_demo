import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domain/user';

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

  public getUserById(id : number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${id}`);
  }

  public getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/user/find/email/${email}`);
  }

  public getUserByUserCode(userCode : string) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/user-code/${userCode}`);
  }

  public login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.http.post<User>(`${this.apiServerUrl}/user/login`, body.toString(), { headers: headers });
  }

  public updateUser(user : User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public sendPaswordRestore(email : String): Observable<any> {
    return this.http.post<void>(`${this.apiServerUrl}/user/send-password-restore`, email);
  }

  public sendActivateAccount(email : String): Observable<any> {
    return this.http.post<void>(`${this.apiServerUrl}/user/send-activate-account`, email);
  }
}
