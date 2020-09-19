import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { IPlayerRecord } from '@features/play/interfaces';
import { PlayService } from '@features/play/services/play.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardPageComponent implements OnInit {
  loading: boolean;
  scores: IPlayerRecord[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private playSrv: PlayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.playSrv.getScores().then(res => {
      console.log(res);
      this.scores = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
