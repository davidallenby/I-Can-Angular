import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ListComponent
  ],
  exports: [
    ListComponent
  ],
})
export class SharedModule { }
