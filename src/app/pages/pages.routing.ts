import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ], // aquí protegemos nuestras rutas
        // Si hay carga perezosa, debe estar el canLoad
        canLoad: [ AuthGuard ], // Nos asegura que la ruta se pueda cargar antes de hacer otra cosa.
        // Carga perezosa
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
