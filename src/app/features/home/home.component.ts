import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IListData } from '@shared/components/list';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  owners$: Observable<IListData[]>;
  catsByOwnerGender: IListData[] = [];

  constructor(private homeSrv: HomeService) { }

  ngOnInit(): void {
    this.owners$ = this.homeSrv.getOwners().pipe(map((owners) => {
      return this.homeSrv.getCatsByOwnerGender(owners);
    }));
  }

  ngOnDestroy(): void {
    // While we should unsubscribe from Observables in here to prevent memory
    // leaks, our Async pipe in the template does it automatically!
  }

}
