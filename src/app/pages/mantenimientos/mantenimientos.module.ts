import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosComponent } from './productos/productos.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

@NgModule({
  declarations: [
    ProductosComponent,
    OfertasComponent,
    UsuariosComponent, 
    ProveedoresComponent, 
  ],
  exports: [
    ProductosComponent,
    OfertasComponent,
    UsuariosComponent, 
    ProveedoresComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MantenimientosModule { }
