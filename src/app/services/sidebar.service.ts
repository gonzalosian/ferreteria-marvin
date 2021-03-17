import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', icono: 'mdi mdi-gauge', url: '/' },
        { titulo: 'Nosotros', icono: 'mdi mdi-account-group', url: 'nosotros' },
        { titulo: 'Contactenos', icono: 'mdi mdi-cellphone-message', url: 'contactenos' },
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Ofertas', icono: 'mdi mdi-cart-arrow-down', url: 'ofertas' },
        { titulo: 'Productos', icono: 'mdi mdi-shape', url: 'productos' },
        { titulo: 'Proveedores', icono: 'mdi mdi-human-baby-changing-table', url: 'proveedores' },
        { titulo: 'Usuarios', icono: 'mdi mdi-badge-account-horizontal-outline', url: 'usuarios' },
      ]
    }
  ];

  constructor() { }
}
