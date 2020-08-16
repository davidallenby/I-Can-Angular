import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppRoutingModule } from './routing/app-routing.module';
import { SharedModule } from '@shared/shared.module';

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ],
})
export class CoreModule {}
