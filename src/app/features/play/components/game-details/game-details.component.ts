import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnChanges, SimpleChanges, EventEmitter, Output
} from '@angular/core';

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
  // @Output() timeEndHandler: EventEmitter<any> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
