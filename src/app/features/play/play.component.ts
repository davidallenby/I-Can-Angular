import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { IPlayerRecord } from './interfaces';
import { PlayService } from './services/play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayComponent implements OnInit, OnDestroy {
  @ViewChild('name', {static: false}) name: ElementRef;
  // TODO: Add types
  userMessage = '';
  preparingLevel = true;
  gameInProgress = false;
  score = 0;
  moles = [];
  timeLeft = 1;
  gameOver = false;
  pause = false;
  highScore = 0;
  nameError: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.highScore = this.playSrv.getHighestScore();
    this.initGame();
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
  private async initCountDown(): Promise<void> {
    let countdown = 5;
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
  private async initGame(): Promise<void> {
    this.score = 0;
    this.timeLeft = 5;
    this.moles = this.playSrv.generateMoles();
    await this.initCountDown();
    // Start the level
    this.gameOver = false;
    this.preparingLevel = false;
    this.gameInProgress = true;
    console.log("Game started in parent")
    this.startCounter();
  }

  /**
   * Starts the game timer
   *
   * @private
   * @memberof PlayComponent
   */
  private startCounter(): void {
    const timer = setInterval(() => {
      if (!this.pause) {
        this.timeLeft--;
        if (!this.timeLeft) {
          this.endGame();
          clearInterval(timer);
        }
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  /**
   * Ends the game
   *
   * @private
   * @memberof PlayComponent
   */
  private endGame(): void {
    this.nameError = '';
    this.gameInProgress = false;
    this.gameOver = true;
    // If the current game score beats the highscore, update it in the view.
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
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
   * Exit the game back to the home page of the app
   *
   * @memberof PlayComponent
   */
  exitGame(): void {
    this.router.navigate(['/']);
  }

  /**
   * Re-initialises the game
   *
   * @memberof PlayComponent
   */
  async restartGame(): Promise<void> {
    if (this.score) {
      if (this.validateName()) {
        const rec: IPlayerRecord = {
          score: this.score,
          name: this.name.nativeElement.value
        };
        await this.playSrv.setHighScore(rec);
        this.initGame();
        return;
      }
    }
    this.initGame();
    return;
  }

  validateName(): boolean {
    const name = this.name.nativeElement.value;
    if (name.length < 3) {
      this.nameError = 'Name is not valid. Please set a value of 3 characters';
      return false;
    }
    return true;
  }
}
