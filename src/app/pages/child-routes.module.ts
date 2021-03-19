import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactenosComponent } from './contactenos/contactenos.component';

import { OfertasComponent } from './mantenimientos/ofertas/ofertas.component';
import { ProductosComponent } from './mantenimientos/productos/productos.component';
import { ProveedoresComponent } from './mantenimientos/proveedores/proveedores.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const childRoutes: Routes = [
    
    // Rutas públicas
    { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
    { path: 'nosotros', component: NosotrosComponent, data: {titulo: 'Nosotros'} },
    { path: 'contactenos', component: ContactenosComponent, data: {titulo: 'Contactenos'} },
    
    // Rutas protegidas (Mantenimiento)
    { path: 'ofertas', component: OfertasComponent, data: {titulo: 'Ofertas'} },
    { path: 'productos', component: ProductosComponent, data: {titulo: 'Productos'} },
    { path: 'proveedores', component: ProveedoresComponent, data: {titulo: 'Proveedores'} },
    { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'} },

];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule {}
