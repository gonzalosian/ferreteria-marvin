import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactenosComponent } from './contactenos/contactenos.component';

import { OfertasComponent } from './mantenimientos/ofertas/ofertas.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ResenasComponent } from './mantenimientos/resenas/resenas.component';
import { RubrosComponent } from './mantenimientos/rubros/rubros.component';
import { ProductoComponent } from './mantenimientos/productos/producto.component';
import { ResenaComponent } from './mantenimientos/resenas/resena.component';


const childRoutes: Routes = [
    
    // Rutas públicas
    { path: '', component: DashboardComponent, data: {titulo: 'Inicio'} },
    { path: 'nosotros', component: NosotrosComponent, data: {titulo: 'Nosotros'} },
    { path: 'contactenos', component: ContactenosComponent, data: {titulo: 'Contáctenos'} },
    
    // Rutas protegidas (Mantenimiento)
    { path: 'ofertas', component: OfertasComponent, data: {titulo: 'Mantenimiento de Ofertas'} },
    { path: 'productos', component: ProductosComponent, data: {titulo: 'Mantenimiento de Productos'} },
    { path: 'producto/:id', component: ProductoComponent, data: { titulo: 'Mantenimiento de Producto' } },
    { path: 'proveedores', component: ProveedoresComponent, data: {titulo: 'Mantenimiento de Proveedores'} },
    { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
    { path: 'resenas', component: ResenasComponent, data: {titulo: 'Mantenimiento de Reseñas'} },
    { path: 'resena/:id', component: ResenaComponent, data: {titulo: 'Mantenimiento de Reseña'} },
    { path: 'rubros', component: RubrosComponent, data: {titulo: 'Mantenimiento de Rubros'} },

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule {}
