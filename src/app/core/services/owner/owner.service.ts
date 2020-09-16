import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from './owner.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>('http://i-can-angular.azurewebsites.net/people.json');
  }
}
