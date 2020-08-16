import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // Lazy loading routes improves performance! DA - 16/08/20
  {
    path: '',
    loadChildren: () => import('@features/home/home.module').then(m => {
      return m.HomeModule;
    })
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Pre-loading modules improves UX! DA - 16/08/20
    // https://angular.io/guide/lazy-loading-ngmodules#preloading
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
