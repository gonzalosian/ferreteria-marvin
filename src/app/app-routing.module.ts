import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactenosComponent } from './pages/contactenos/contactenos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
// Mantenimiento
import { OfertasComponent } from './pages/mantenimientos/ofertas/ofertas.component';
import { ProductosComponent } from './pages/mantenimientos/productos/productos.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children: [
      // Rutas protegidas
      { path: 'ofertas', component: OfertasComponent },
      { path: 'productos', component: ProductosComponent },
    
      // Rutas públicas
      { path: 'dashboard', component: DashboardComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'contactenos', component: ContactenosComponent },
      
      // Auth
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

      { path: '', redirectTo:'/dashboard', pathMatch:'full' },
    ]
  },

  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
