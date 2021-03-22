import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { ContactenosComponent } from './contactenos/contactenos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PagesComponent } from './pages.component';

import { OfertasComponent } from './mantenimientos/ofertas/ofertas.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ResenasComponent } from './mantenimientos/resenas/resenas.component';
import { RubrosComponent } from './mantenimientos/rubros/rubros.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { ResenaComponent } from './mantenimientos/resenas/resena.component';
import { VerResenaComponent } from './mantenimientos/resenas/ver-resena.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ContactenosComponent,
    NosotrosComponent,
    PagesComponent,
    ProductosComponent,
    ProductoComponent,
    OfertasComponent,
    UsuariosComponent, 
    ProveedoresComponent, 
    ResenasComponent, 
    RubrosComponent, ResenaComponent, VerResenaComponent, 
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class PagesModule { }
