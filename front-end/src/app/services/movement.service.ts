import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movement } from '../domain/movement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getProfileMovements(profileId : number): Observable<any> {
    return this.http.get<Movement[]>(`${this.apiServerUrl}/movement/${profileId}/all`);
  }

  public updateMovement(movement : Movement): Observable<Movement> {
    return this.http.put<Movement>(`${this.apiServerUrl}/movement/update`, movement);
  }

  public addMovement(movement : Movement) {
    return this.http.post<Movement>(`${this.apiServerUrl}/movement/add`, movement);
  }

  public deleteMovement(movementId : number) {
    return this.http.delete<void>(`${this.apiServerUrl}/movement/delete/${movementId}`);
  }
}
