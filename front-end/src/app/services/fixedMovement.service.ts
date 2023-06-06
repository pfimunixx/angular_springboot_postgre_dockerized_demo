import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FixedMovement } from '../domain/fixedMovement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedMovementService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getProfileFixedMovements(profileId : number): Observable<any> {
    return this.http.get<FixedMovement[]>(`${this.apiServerUrl}/fixed-movement/${profileId}/all`);
  }

  public updateFixedMovement(fixedMovement : FixedMovement): Observable<FixedMovement> {
    return this.http.put<FixedMovement>(`${this.apiServerUrl}/fixed-movement/update`, fixedMovement);
  }

  public addFixedMovement(fixedMovement : FixedMovement) {
    return this.http.post<FixedMovement>(`${this.apiServerUrl}/fixed-movement/add`, fixedMovement);
  }

  public deleteFixedMovement(fixedMovementId : number) {
    return this.http.delete<void>(`${this.apiServerUrl}/fixed-movement/delete/${fixedMovementId}`);
  }
}
