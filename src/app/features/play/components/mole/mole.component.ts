import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  Input, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild, ElementRef,
  AfterViewInit
} from '@angular/core';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-mole',
  templateUrl: './mole.component.html',
  styleUrls: ['./mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit, OnDestroy, OnChanges,
AfterViewInit {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  @Input() active: boolean;
  @Input() time = 60;
  @ViewChild('mole', {static: false}) mole: ElementRef;
  clicked = false;
  speed = 7.0;
  delay = 0.0;

  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // When the active state changes, we will want to re-initialise the game.
    if (changes.active && !changes.active.firstChange) {
      const active = changes.active.currentValue;

      if (active) {
        this.calculateSpeed();
      } else {
        this.resetGame();
      }
    }
  }

  resetGame(): void {
    this.speed = 7.0;
    this.delay = 0.0;
  }

  startGame(): void {
    this.mole.nativeElement.addEventListener('animationiteration', () => {
      this.mole.nativeElement.style.webkitAnimationPlayState = 'paused';
      this.mole.nativeElement.style.animationDuration = this.speed + 's';
      this.mole.nativeElement.style.webkitAnimationPlayState = 'running';
    });
    this.calculateSpeed();
  }

  calculateSpeed(): void {
    const timer = setInterval(() => {
      if (!this.time || !this.active) {
        clearInterval(timer);
      }
      this.speed = this.playSrv.generateNewSpeed(this.speed);
    }, 5000);
  }

  /**
   * Fired when the user successfully whack's a mole
   *
   */
  onClick(e: Event): void {
    // Tell the parent component to incrememnt the score
    this.clickHandler.emit(e);
    // Prevents the mole from popping up again
    this.clicked = true;
    setTimeout(() => {
      // Start the animation again
      this.clicked = false;
      this.cdr.detectChanges();
    }, 2000);
  }

}
