import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // Lazy loading routes improves performance! DA
  {
    path: '',
    loadChildren: () => import('@features/home/home.module').then(m => {
      return m.HomeModule;
    })
  },
  {
    path: 'play',
    loadChildren: () => import('@features/play/play.module').then(m => {
      return m.PlayModule;
    })
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
    // Pre-loading modules improves UX!
    // https://angular.io/guide/lazy-loading-ngmodules#preloading
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
