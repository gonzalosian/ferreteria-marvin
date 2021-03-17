import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { MantenimientosComponent } from './mantenimientos.component';

// import { OfertasComponent } from './ofertas/ofertas.component';
// import { ProductosComponent } from './productos/productos.component';
// import { ProveedoresComponent } from './proveedores/proveedores.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
//     {
//         path: '',
//         component: MantenimientosComponent,
//         children: [
//             // Rutas protegidas (Mantenimiento)
//             { path: 'ofertas', component: OfertasComponent },
//             { path: 'productos', component: ProductosComponent },
//             { path: 'proveedores', component: ProveedoresComponent },
//             { path: 'usuarios', component: UsuariosComponent },
    
//             { path: '', redirectTo:'/ofertas', pathMatch:'full' },
//         ]
//     },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class MantenimientosRoutingModule {}
