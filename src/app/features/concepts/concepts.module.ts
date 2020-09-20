import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ConceptsComponent } from './concepts.component';
import { AngularServicesComponent } from './components/angular-services/angular-services.component';
import {AngularServicesService} from './components/angular-services/services/angular-services.service';

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
      {
        path: 'services',
        component: AngularServicesComponent
      }
    ])
  ],
  declarations: [
    ConceptsComponent,
    AngularServicesComponent
  ],
  exports: [
    ConceptsComponent,
    AngularServicesComponent
  ],
  providers: [
    AngularServicesService
  ]
})
export class ConceptsModule { }
