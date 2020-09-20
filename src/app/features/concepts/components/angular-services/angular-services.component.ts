import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  constructor(private angularSrv: AngularServicesService) {}

  onQuoteRequest(e: Event): void {
    console.log("CLICK");
    this.loadingQuote = true;
    // We don't need to unsubscribe from this subscription on destroy because
    // we're using the async pipe in the template. It does it automatically.
    this.quote$ = this.angularSrv.getProgrammingQuote()
    .pipe(map((val: IQuoteRequestData) => {
      this.loadingQuote = false;
      return val;
    }));
  }
}
