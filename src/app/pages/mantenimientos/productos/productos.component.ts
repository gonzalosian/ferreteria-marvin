import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit, OnDestroy {

  public productos: Producto[] = [];
  public productosTemp: Producto[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private productoService: ProductoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarProductos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(500) )
      .subscribe( img => {
        // console.log(img);
        this.cargarProductos();
    } );
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


  eliminarProducto( producto: Producto ){

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(producto._id)
          .subscribe( resp => {
            this.cargarProductos();

            Swal.fire(
              'Eliminado!',
              `El médico ${producto.nombre} a sido eliminado.`,
              'success'
            );            
          } )
      }
    })
  }


  buscar( termino: string ){

    if(termino.length === 0){
      return this.cargarProductos();
    }

    this.busquedasService.buscar( 'productos', termino )
      .subscribe( resultados => {
        this.productos = resultados;
      } )
  }


  abrirModal( producto: Producto ){
    this.modalImagenService.abrirModal( 'productos', producto._id, producto.img );
  }

}
