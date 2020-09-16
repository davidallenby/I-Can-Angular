import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './play.component';

import { MoleComponent } from './components/mole/mole.component';

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
    MoleComponent
  ],
  exports: [
    PlayComponent,
    MoleComponent
  ],
  providers: [
  ]
})
export class PlayModule {}
