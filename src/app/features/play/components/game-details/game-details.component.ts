import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnChanges, SimpleChanges
} from '@angular/core';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() score = 0;
  @Input() time = 0;
  @Input() level = 0;
  @Input() highScore = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
