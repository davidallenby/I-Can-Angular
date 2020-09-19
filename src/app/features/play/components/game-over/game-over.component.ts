import {
  Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, 
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { IPlayerRecord } from '@features/play/interfaces';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverComponent {
  @ViewChild('name', {static: false}) name: ElementRef;
  @Output() restartGame: EventEmitter<boolean> = new EventEmitter();
  @Input() score: number;
  constructor(
    private router: Router,
    private playSrv: PlayService,
  ) { }

  /**
   * When a mole is clicked, it fires a score change up to the parent
   */
  async onRestartClick(e: Event): Promise<void> {
    await this.saveScore();
    this.restartGame.emit(true);
  }

  /**
   * Exit the game back to the home page of the app
   */
  async exitGame(e: Event): Promise<void> {
    await this.saveScore();
    this.router.navigate(['/']);
  }

  /**
   * Save this score to the database
   *
   * @private
   * @returns {Promise<void>}
   * @memberof GameOverComponent
   */
  private async saveScore(): Promise<void> {
    const nameVal = this.name.nativeElement.value;
    const rec: IPlayerRecord = {
      score: this.score,
      name: (!nameVal) ? 'NON' : nameVal
    };
    return this.playSrv.setHighScore(rec);
  }
}
