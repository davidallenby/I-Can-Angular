import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Output() timeChange: EventEmitter<number> = new EventEmitter();
  @Output() gameOver: EventEmitter<boolean> = new EventEmitter();
  @Input() score = 0;
  @Input() pause = false;
  @Input() gameInProgress = false;
  @Input() highScore = 0;
  loadingHighScore = true;
  destroy: boolean;
  time = 0;

  constructor(
    private playSrv: PlayService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get the high score
    this.playSrv.getHighestScore().then((score: number) => {
      this.highScore = score;
      this.loadingHighScore = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameInProgress) {
      const active = changes.gameInProgress.currentValue;
      if (active) {
        this.startCounter();
      } else {
        // If the game ends and the score is higher than the high score...
        if (this.score > this.highScore) {
          // Update the view with the new high score.
          this.highScore = this.score;
        }
      }
    }
  }

  /**
   * Starts the game timer
   *
   * @private
   * @memberof PlayComponent
   */
  private startCounter(): void {
    this.time = 10; // Reset the time
    const timer = setInterval(() => {
      if (!this.pause) {
        this.time--;
        if (!this.time || this.destroy) {
          this.gameOver.emit(true);
          clearInterval(timer);
        }
        this.timeChange.emit(this.time);
        this.cdr.detectChanges();
      }
    }, 1000);
  }
}
