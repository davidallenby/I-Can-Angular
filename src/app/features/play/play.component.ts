import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayComponent implements OnInit, OnDestroy {
  // TODO: Add types
  userMessage = '';
  preparingLevel = true;
  gameInProgress = false;
  score = 0;
  timeLeft: number;
  gameOver = false;
  pause = false;
  loadingHighScore = false;
  destroy: boolean;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initGame();
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

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
  private async initCountDown(): Promise<void> {
    let countdown = 5;
    this.userMessage = 'Are you ready?';
    this.cdr.detectChanges();
    await this.delay(1);
    return new Promise(resolve => {
      const timer = setInterval(() => {
        // If the countdown has reached 0, start the game
        if (!countdown || this.destroy) {
          clearInterval(timer);
          resolve();
        }
        // Update the user message with the current count
        this.userMessage = countdown.toString();
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
  private async initGame(): Promise<void> {
    // Reset the score, and the clock
    this.score = 0;
    // Set the screen that shows the pre-game countdown
    this.userMessage = '';
    this.gameOver = false;
    this.preparingLevel = true;
    // Start the pre-game countdown
    await this.initCountDown();
    // Start the level
    this.preparingLevel = false;
    this.gameInProgress = true;
    this.cdr.detectChanges();
  }

  /**
   * Ends the game
   *
   * @private
   * @memberof PlayComponent
   */
  endGame(e: Event): void {
    this.gameInProgress = false;
    this.gameOver = true;
  }

  /**
   * When the time changes we want to pass that down to the child components.
   *
   * @param {number} time
   * @memberof PlayComponent
   */
  onTimeChange(time: number): void {
    this.timeLeft = time;
    this.cdr.detectChanges();
  }

  /**
   * Pauses the game. Useful for if the user tries to navigate away. We can set
   * a route guard to ask them to confirm if they want to leave or not.
   *
   * @param {Event} e
   * @memberof PlayComponent
   */
  pauseGame(e: Event): void {
    this.pause = !this.pause;
    this.cdr.detectChanges();
  }

  /**
   * Re-initialises the game
   *
   * @memberof PlayComponent
   */
  async restartGame(e: Event): Promise<void> {
    this.gameOver = false;
    this.initGame();
  }
}
