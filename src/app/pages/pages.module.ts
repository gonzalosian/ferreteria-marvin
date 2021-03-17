import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ContactenosComponent,
    NosotrosComponent,    
  ],
  exports: [
    DashboardComponent,
    ContactenosComponent,
    NosotrosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
