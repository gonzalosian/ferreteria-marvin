import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public productos: Producto[] = [];
  public cargando: boolean = true;

  constructor( private productoService: ProductoService ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.cargando = true;

    this.productoService.cargarProductos()
      .subscribe( productos => {
        this.cargando = false;
        // console.log(productos);
        this.productos = productos;
        
      } )
  }

}
