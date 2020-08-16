import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from './owner.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private owners: Owner[];

  constructor(private httpClient: HttpClient) {}

  getOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>('http://agl-developer-test.azurewebsites.net/people.json');
  }
}
