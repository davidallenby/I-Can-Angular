import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  ViewEncapsulation, Input, OnChanges, SimpleChanges, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'app-mole',
  templateUrl: './mole.component.html',
  styleUrls: ['./mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MoleComponent implements OnInit, OnDestroy, OnChanges {
  @Output() clickHandler: EventEmitter<any> = new EventEmitter();
  @Input() speed = 1;
  animationSpeed = `${this.speed}s`;
  clicked = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.speed) {
      this.animationSpeed = `${this.speed}s`;
    }
  }

  onClick(e: Event): void {
    this.clickHandler.emit(e);
    this.clicked = true;
    setTimeout(() => {
      this.clicked = false;
      this.cdr.detectChanges();
    }, 2000);
  }

}
