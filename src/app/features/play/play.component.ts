import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { LEVEL_SCHEMA } from './constants';
import { PlayService } from './services/play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent implements OnInit, OnDestroy {
  // TODO: Add types
  userMessage = '';
  preparingLevel = true;
  gameInProgress = false;
  score = 0;
  level = 0;
  moles = [];
  timeLeft = 1;
  highScore = 0;
  currentLevel = LEVEL_SCHEMA[0];
  gameOver = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLevel(this.level);
  }

  ngOnDestroy(): void { }

  onClick(e: Event): void {
    this.score++;
  }

  /**
   * Initialise the countdown at the beginning of the level
   *
   * @private
   * @param {number} level
   * @memberof PlayComponent
   */
  private async initCountDown(level: number): Promise<void> {
    let countdown = 5;
    this.userMessage = `Level ${level + 1}`;
    await this.delay(1);
    this.userMessage = 'Are you ready?';
    this.cdr.detectChanges();
    await this.delay(1);
    return new Promise(resolve => {
      const timer = setInterval(() => {
        // If the countdown has reached 0, start the game
        if (!countdown) {
          clearInterval(timer);
          resolve();
        }
        this.userMessage = countdown.toString();
        console.log(countdown);
        countdown--;
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  /**
   * Utility function. Allows us to chain set timeouts together
   *
   * @private
   * @param {*} time
   * @returns {Promise<any>}
   * @memberof PlayComponent
   */
  private delay(time): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, (time * 1000)));
  }

  /**
   * Initialise the level definition. Sets the difficulty, and resets scores etc
   *
   * @private
   * @param {number} level
   * @memberof PlayComponent
   */
  private async initLevel(level: number): Promise<void> {
    this.currentLevel = LEVEL_SCHEMA[level];
    this.timeLeft = this.currentLevel.time;
    console.log('Level ' + (level + 1) + ': ', );
    this.moles = this.playSrv.generateMoles(this.currentLevel);
    // await this.initCountDown(level);
    console.log('START!');
    // Start the level
    this.gameOver = false;
    this.preparingLevel = false;
    this.gameInProgress = true;
    this.startCounter();
  }

  private startCounter(): void {
    const timer = setInterval(() => {
      this.timeLeft--;
      if (!this.timeLeft) {
        this.endLevel();
        clearInterval(timer);
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  private endLevel(): void {
    this.preparingLevel = true;
    this.gameInProgress = false;
    const progress = this.getProgress();
    // If the user can't progress, end the game...
    if (!progress) {
      this.endGame();
    } else {
      this.level++;
    }

  }

  /**
   * Check if the user's score is greater than or equal to the minimum score
   * required for progression on this level.
   *
   * @private
   * @returns {boolean}
   * @memberof PlayComponent
   */
  private getProgress(): boolean {
    const minScore = this.currentLevel.minScore;
    return (this.score >= minScore);
  }

  private endGame(): void {
    this.stopGame();
    this.gameOver = true;
  }

  private stopGame(): void {
    this.preparingLevel = true;
    this.gameInProgress = false;
  }

  exitGame(): void {
    this.router.navigate(['/']);
  }

  restartGame(): void {
    this.initLevel(0);
  }

  nextLevel(): void {
    this.initLevel(this.level++);
  }
}
