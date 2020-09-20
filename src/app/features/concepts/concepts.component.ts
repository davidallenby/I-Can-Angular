import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IListItem } from '@shared/components/list/list.interface';
import { ANGULAR_CONCEPTS } from './constants';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConceptsComponent {
  concepts: IListItem[] = ANGULAR_CONCEPTS;
  constructor() {}
}
