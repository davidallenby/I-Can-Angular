import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../../shared/shared.module';

// Components
import { HomeComponent } from './home.component';

// Services
import { HomeService } from './services/home.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {}
