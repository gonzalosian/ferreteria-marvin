import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Resena } from '../../../models/resena.model';
import { ResenaService } from '../../../services/resena.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styles: [
  ]
})
export class ResenaComponent implements OnInit, OnDestroy {

  public resenaForm: FormGroup;
  public resenaSeleccionado: Resena;
  public paramsSubs: Subscription;

  constructor( private fb: FormBuilder,
              private resenaService: ResenaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.paramsSubs = this.activatedRoute.params.subscribe( ({id}) => { // el nombre que le pusimos en el routing, es el mismo que debemos poner en el params.
      //console.log( params );
      this.cargarResena( id );
      // console.log('tick'); // verificamos si tenemos 2 o mas tick, o sea, fuga de memoria.
    } )
    
    this.resenaForm = this.fb.group({
      nombre: [ '', Validators.required ],
      cantidadEstrellas: [ '', Validators.required ],
      descripcion: [ '', Validators.required ],
    })

  }


  cargarResena( id: string ){

    if( id === 'nuevo' ){
      return;
    }

     this.resenaService.obtenerResenaById( id )
       .pipe(
         delay(100) // 100 ms imperceptible para el usuario
       )
       .subscribe( resena => {
        //  console.log(resena);

        if( !resena ){ // Si el médico no existe o lo inventaron, lo sacamos.
          return this.router.navigateByUrl(`/dashboard/resenas`);
        }

         const { nombre, cantidadEstrellas, descripcion } = resena;

         this.resenaSeleccionado = resena;
         // completamos el Form Group
         this.resenaForm.setValue( { nombre, cantidadEstrellas, descripcion } )
       })
  }


  guardarResena(){

    const { nombre } = this.resenaForm.value;

    if( this.resenaSeleccionado ){
      // actualizar
      const data = {
        ...this.resenaForm.value,
        _id: this.resenaSeleccionado._id
      }
      // console.log( data );

      this.resenaService.actualizarResena( data )
        .subscribe( resp => {
          Swal.fire('Resena actualizada', `${nombre} - Actualizada correctamente`, 'success' );
        } )
    } else {
      // crear
      // console.log(this.resenaForm.value);
      this.resenaService.crearResena( this.resenaForm.value )
        .subscribe( (resp:any) => {
          // console.log(resp);
          Swal.fire('Resena guardada', `${nombre} - Creada correctamente`, 'success' );
          this.router.navigateByUrl(`/dashboard/resena/${ resp.resena._id }`)
        } )
    }
  }


  abrirModal( resena: Resena ){
    this.modalImagenService.abrirModal( 'resenas', resena._id, resena.img );    
  }

}
