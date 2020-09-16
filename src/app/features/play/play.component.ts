import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent implements OnInit, OnDestroy {
  countdown = 5;
  preparing = true;
  score = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const timer = setInterval(() => {
      this.countdown--;

      if (!this.countdown) {
        clearInterval(timer);
        this.preparing = false;
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {

  }

  onClick(e: Event): void {
    this.score++;
    // this.cdr.detectChanges();
  }

}
