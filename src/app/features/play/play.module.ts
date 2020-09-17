import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './play.component';

import { MoleComponent } from './components/mole/mole.component';
import {
  GameDetailsComponent
} from './components/game-details/game-details.component';

import { PlayService } from './services/play.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayComponent
      }
    ])
  ],
  declarations: [
    PlayComponent,
    MoleComponent,
    GameDetailsComponent
  ],
  exports: [
    PlayComponent,
    MoleComponent, 
    GameDetailsComponent
  ],
  providers: [
    PlayService
  ]
})
export class PlayModule {}
