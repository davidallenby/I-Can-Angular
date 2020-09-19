import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit, OnDestroy, OnChanges {
  @Output() scoreChange: EventEmitter<any> = new EventEmitter();
  @Input() time = 0;
  @Input() pause = false;
  @Input() gameInProgress = false;
  // TODO: Set a type
  moles: any = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService
  ) { }

  ngOnInit(): void {
    // Generate the moles
    this.moles = this.playSrv.generateMoles();
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  /**
   * When a mole is clicked, it fires a score change up to the parent
   *
   * @param {Event} e
   * @memberof GameBoardComponent
   */
  onMoleClick(e: Event): void {
    this.scoreChange.emit(true);
  }
}
