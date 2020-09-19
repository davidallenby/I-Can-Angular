import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './play.component';

import { MoleComponent } from './components/mole/mole.component';
import {
  GameDetailsComponent
} from './components/game-details/game-details.component';
import {
  GameBoardComponent
} from './components/game-board/game-board.component';
import {
  LeaderboardPageComponent
} from './components/leaderboard/leaderboard-page.component';
import {
  GameOverComponent
} from './components/game-over/game-over.component';

import { PlayService } from './services/play.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayComponent
      },
      {
        path: 'leaderboard',
        component: LeaderboardPageComponent
      }
    ])
  ],
  declarations: [
    PlayComponent,
    MoleComponent,
    GameDetailsComponent,
    GameBoardComponent,
    GameOverComponent,
    LeaderboardPageComponent
  ],
  exports: [
    PlayComponent,
    MoleComponent,
    GameDetailsComponent,
    GameBoardComponent,
    GameOverComponent,
    LeaderboardPageComponent
  ],
  providers: [
    PlayService
  ]
})
export class PlayModule {}
