import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuoteRequestData } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularServicesService {
  constructor(private http: HttpClient) { }

  /**
   * Gets a random programming quote
   *
   * @returns {Observable<any>}
   * @memberof AngularServicesService
   */
  getProgrammingQuote(): Observable<any> {
    return this.http.get('https://programming-quotes-api.herokuapp.com/quotes/random');
  }
}
