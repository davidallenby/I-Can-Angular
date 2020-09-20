import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent {
  @Output() scoreChange: EventEmitter<any> = new EventEmitter();
  @Input() time = 0;
  @Input() pause = false;
  @Input() gameInProgress = false;
  constructor() { }

  /**
   * When a mole is clicked, it fires a score change up to the parent
   */
  onMoleClick(e: Event): void {
    this.scoreChange.emit(true);
  }
}
