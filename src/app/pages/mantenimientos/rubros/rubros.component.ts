import { Component, OnDestroy, OnInit } from '@angular/core';
import { Rubro } from 'src/app/models/rubro.model';
import { RubroService } from '../../../services/rubro.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styles: [
  ]
})
export class RubrosComponent implements OnInit, OnDestroy {

  public rubros: Rubro[] = [];
  public rubrosTemp: Rubro[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private rubroService: RubroService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

    ngOnDestroy(): void {
      this.imgSubs.unsubscribe()
    }
  
    ngOnInit(): void {
  
      this.cargarRubros();
  
      this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(500) )
        .subscribe( img => {
          // console.log(img);
          this.cargarRubros();
      } );
    }
  
  
    cargarRubros(){
      this.cargando = true;
  
      this.rubroService.cargarRubros()
        .subscribe( rubros => {
          this.cargando = false;
          // console.log(rubros);
          this.rubros = rubros;
          
        } )
    }
  
  
    guardarCambios( rubro: Rubro ){
      // console.log( hospital );
      const { _id, nombre } = rubro;
      this.rubroService.actualizarRubro( _id, nombre )
        .subscribe( resp => {
          Swal.fire('Guardado', nombre, 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        } )
    }
  
  
    eliminarRubro( rubro: Rubro ){
  
      Swal.fire({
        title: '¿Borrar rubro?',
        text: `Está a punto de borrar a ${rubro.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.rubroService.eliminarRubro(rubro._id)
            .subscribe( resp => {
              this.cargarRubros();
  
              Swal.fire(
                'Eliminado!',
                `El rubro ${rubro.nombre} a sido eliminado.`,
                'success'
              );            
            } )
        }
      })
    }
  
  
    buscar( termino: string ){
  
      if(termino.length === 0){
        return this.cargarRubros();
      }
      this.busquedasService.buscar( 'rubros', termino )
        .subscribe( resultados => {
          this.rubros = resultados;
        } )
    }
  
  
    async abrirSweetAlert(){
      const {value = ''} = await Swal.fire<string>({
        title: 'Crear Rubro',
        text: 'Ingrese el nombre del nuevo Rubro',
        input: 'text',
        // inputLabel: 'Nombre del Hospital',
        inputPlaceholder: 'Nombre Rubro',
        showCancelButton: true,
      })
  
      // console.log(valor);
      if( value.trim().length > 0 ){
        this.rubroService.crearRubro( value )
          .subscribe( (resp:any) => {
            // this.cargarHospitales();
            this.rubros.push( resp.rubro );
            Swal.fire(`Nuevo Rubro: <br> ${ value }`)
          } )
      }
    }
  
  
    abrirModal( rubro: Rubro ){
      // console.log(usuario);
      this.modalImagenService.abrirModal( 'rubros', rubro._id, rubro.img );
    }

}
