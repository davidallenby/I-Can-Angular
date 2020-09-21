import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IQuoteRequestData } from './interfaces';
import { AngularServicesService } from './services/angular-services.service';

@Component({
  selector: 'app-angular-services',
  templateUrl: './angular-services.component.html',
  styleUrls: ['./angular-services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularServicesComponent {
  loadingQuote: boolean;
  quote$: Observable<IQuoteRequestData>;
  quoteError$: Subject<Error> = new Subject<Error>();
  constructor(private angularSrv: AngularServicesService) {}

  /**
   * Fired when the user clicks the button to request a quote
   *
   * @param {Event} e
   * @memberof AngularServicesComponent
   */
  onQuoteRequest(e: Event): void {
    this.loadingQuote = true;
    // We don't need to unsubscribe from this subscription on destroy because
    // we're using the async pipe in the template. It does it automatically.
    this.quote$ = this.angularSrv.getProgrammingQuote()
    .pipe(
      map((val: IQuoteRequestData) => {
        this.loadingQuote = false;
        return val;
      }),
      catchError((error: Error) => {
        console.error('Error when requesting quote: ', error);
        this.loadingQuote = false;
        this.quoteError$.next(error);
        return throwError(error);
      })
    );
  }
}
