import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Rubro } from '../../../models/rubro.model';
import { Producto } from '../../../models/producto.model';
import { RubroService } from '../../../services/rubro.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit, OnDestroy {

  public productoForm: FormGroup;
  public rubros: Rubro[] = [];
  public rubroSeleccionado: Rubro;
  public productoSeleccionado: Producto;
  public paramsSubs: Subscription;

  constructor( private fb: FormBuilder,
               private rubroService: RubroService,
               private productoService: ProductoService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
  }

  ngOnInit(): void {

    // Hay muchas formas de obtener el id del médico, pero necesito manejarlo con una suscripcion porque puedo
    // estar en la misma pantalla y ese url puede cambiar. Puedo hacerlo por el snapshot, pero este no cambia una vez leido.
    this.paramsSubs = this.activatedRoute.params.subscribe( ({id}) => { // el nombre que le pusimos en el routing, es el mismo que debemos poner en el params.
      //console.log( params );
      this.cargarProducto( id );
      // console.log('tick'); // verificamos si tenemos 2 o mas tick, o sea, fuga de memoria.
    } )
    
    this.productoForm = this.fb.group({
      nombre: [ '', Validators.required ],
      rubro: [ '', Validators.required ],
    })

    this.cargarRubros();

    // Gracias a estar usando formularios reactivos, podemos crear un observable que esté pendiente
    // del rubro seleccionado
    this.productoForm.get('rubro').valueChanges
      .subscribe( rubroId => {
        // console.log(rubroId);
        this.rubroSeleccionado = this.rubros.find( h => h._id === rubroId );
        // console.log( this.rubroSeleccionado );
      } )
  }


  cargarProducto( id: string ){

    if( id === 'nuevo' ){
      return;
    }

     this.productoService.obtenerProductoById( id )
       .pipe(
         delay(100) // 100 ms imperceptible para el usuario
       )
       .subscribe( producto => {
        //  console.log(producto);

        if( !producto ){ // Si el médico no existe o lo inventaron, lo sacamos.
          return this.router.navigateByUrl(`/dashboard/productos`);
        }

         const { nombre, rubro:{ _id } } = producto;
         this.productoSeleccionado = producto;
         // completamos el Form Group
         this.productoForm.setValue( { nombre, rubro: _id } )
       })
  }


  cargarRubros(){
    this.rubroService.cargarRubros()
      .subscribe( (rubros: Rubro[]) => {
        // console.log(rubros);
        this.rubros = rubros;
      } )
  }


  guardarProducto(){

    const { nombre } = this.productoForm.value;

    if( this.productoSeleccionado ){
      // actualizar
      const data = {
        ...this.productoForm.value,
        _id: this.productoSeleccionado._id
      }
      // console.log( data );

      this.productoService.actualizarProducto( data )
        .subscribe( resp => {
          Swal.fire('Médico actualizado', `${nombre} actualizado correctamente`, 'success' );
        } )
    } else {
      // crear
      // console.log(this.productoForm.value);
      this.productoService.crearProducto( this.productoForm.value )
        .subscribe( (resp: any) => {
          // console.log(resp);
          Swal.fire('Médico guardado', `${nombre} creado correctamente`, 'success' );
          this.router.navigateByUrl(`/dashboard/producto/${ resp.producto._id }`)
        } )
    }

  }


  abrirModal( producto: Producto ){
    this.modalImagenService.abrirModal( 'productos', producto._id, producto.img );    
  }

}
