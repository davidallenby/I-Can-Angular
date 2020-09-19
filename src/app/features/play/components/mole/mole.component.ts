import {
  Component, OnDestroy, ChangeDetectionStrategy, Input, OnChanges,
  SimpleChanges, EventEmitter, Output, ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-mole',
  templateUrl: './mole.component.html',
  styleUrls: ['./mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnDestroy, OnChanges {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  @Input() active: boolean; // Determines whether the game has started/ended
  @Input() pause: boolean; // Pause state
  @Input() time = 60; // Game time remaining.
  @ViewChild('mole', {static: false}) mole: ElementRef;
  clicked = false;
  speed = 7.0;
  fastestSpeed = 6.0;
  slowestSpeed = 7.0;
  delay = 0.0;
  destroy: boolean;
  animationEndFn: () => void;

  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService
  ) { }

  ngOnDestroy(): void {
    this.destroy = true;
    this.removeAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When the active state changes, we will want to re-initialise the game.
    if (changes.active && !changes.active.firstChange) {
      const active = changes.active.currentValue;
      // If the game changes to 'active' we want to start the game.
      if (active) {
        this.startGame();
      } else { // If it is set to inactive, we want to reset.
        this.endGame();
      }
    }

    // Detect whether the game has been paused. If so, we want to stop the mole
    // animations
    if (changes.pause && !changes.pause.firstChange) {
      const pause = changes.pause.currentValue;
      this.togglePause(pause);
    }
  }

  /**
   * Start the mole animation
   *
   * @private
   * @memberof MoleComponent
   */
  private startAnimation(): void {
    const mole = this.mole.nativeElement;
    this.animationEndFn = () => this.setNewMoleSpeed();
    this.animationEndFn();
    // Add an event listener to change the mole speed after the animation ends
    mole.addEventListener('animationend', this.animationEndFn, true);
  }

  /**
   * Remove the animation end listener (prevent memory leaks)
   *
   * @private
   * @memberof MoleComponent
   */
  private removeAnimation(): void {
    const mole = this.mole.nativeElement;
    mole.classList.remove('animate');
    if (this.animationEndFn) {
      mole.removeEventListener('animationend', this.animationEndFn);
      this.animationEndFn = null;
    }
  }

  /**
   * Toggle the pause state
   *
   * @param {boolean} bool
   * @memberof MoleComponent
   */
  togglePause(bool: boolean): void {
    const mole = this.mole.nativeElement;
    mole.style.animationPlayState = (bool) ? 'paused' : 'running';
  }

  /**
   * Resets the speed and sets a new delay for the mole.
   *
   * @memberof MoleComponent
   */
  endGame(): void {
    this.speed = 7.0;
    this.delay = this.playSrv.getRandomInRange(0.0, 4.0);
    this.removeAnimation();
  }

  /**
   * Start the game
   *
   * @memberof MoleComponent
   */
  private startGame(): void {
    // Start moving the mole
    this.startAnimation();
    // Initialise the counter to begin generating a new speed.
    this.initSpeedIncreaseTimer();
  }

  /**
   * Generates a new mole speed every 6.5 seconds
   *
   * @memberof MoleComponent
   */
  private initSpeedIncreaseTimer(): void {
    const timer = setInterval(() => {
      if (!this.time || !this.active || this.destroy) {
        clearInterval(timer);
      }
      // If the game is not paused, increase the speed and generate new settings
      if (!this.pause) {
        this.slowestSpeed--;
        this.fastestSpeed--;
        this.generateNewSettings();
      }
      this.cdr.detectChanges();
    }, 6000);
  }

  /**
   * Applies the new mole speed/delay to the element. I had to use add/remove
   * class list here because of how CSS animations work. We can't change the
   * speed of a CSS animation half-way through without it jumping/glitching.
   * This was an alternative solution that I found.
   *
   * @private
   * @memberof MoleComponent
   */
  private setNewMoleSpeed(): void {
    const mole = this.mole.nativeElement;
    mole.classList.remove('animate');
    // Generate a new speed after a mole has been clicked
    this.generateNewSettings();
    // Apply the new settings to the element
    mole.style.animationDuration = this.speed + 's';
    mole.style.animationDelay = this.delay + 's';
    // Add the class again.
    setTimeout(() => mole.classList.add('animate'), 0);
  }

  /**
   * We use this to generate new random speed/delay settings for the mole
   *
   * @private
   * @memberof MoleComponent
   */
  private generateNewSettings(): void {
    this.speed =  this.playSrv
      .getNewSpeed(this.fastestSpeed, this.slowestSpeed);
    this.delay = this.playSrv.getRandomInRange(0.0, 4.0);
  }

  /**
   * Fired when the user successfully whack's a mole
   *
   */
  onClick(e: Event): void {
    // Tell the parent component to incrememnt the score
    this.clickHandler.emit(e);
    // Set new speed/delay for the mole
    this.setNewMoleSpeed();
  }

}
