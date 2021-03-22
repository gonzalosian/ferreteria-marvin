import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Resena } from '../../models/resena.model';
import { ResenaService } from '../../services/resena.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public productos: Producto[] = [];
  public resenas: Resena[] = [];
  public cargando: boolean = true;

  constructor( private productoService: ProductoService,
               private resenaService: ResenaService ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarResenas();
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


  cargarResenas(){
    this.cargando = true;

    this.resenaService.cargarResenas()
      .subscribe( resenas => {
        this.cargando = false;
        // console.log(productos);
        this.resenas = resenas.resenas;
        
      } )
  }

}
