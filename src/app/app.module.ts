import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Módulos
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { MantenimientosModule } from './pages/mantenimientos/mantenimientos.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    MantenimientosModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
