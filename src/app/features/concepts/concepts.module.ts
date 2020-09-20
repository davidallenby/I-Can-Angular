import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConceptsComponent } from './concepts.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { // TIP: If you don't define this when lazy loading modules, the app will
      // hang! DA
        path: '',
        component: ConceptsComponent
      },
      { // TODO: Update component
        path: 'components',
        component: ConceptsComponent
      },
      { // TODO: Update component
        path: 'modules',
        component: ConceptsComponent
      },
      { // TODO: Update component
        path: 'services',
        component: ConceptsComponent
      }
    ])
  ],
  declarations: [
    ConceptsComponent
  ],
  exports: [
    ConceptsComponent
  ],
  providers: []
})
export class ConceptsModule { }
