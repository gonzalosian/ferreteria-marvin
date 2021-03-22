import { Component, OnInit, OnDestroy } from '@angular/core';
import { Resena } from '../../../models/resena.model';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ResenaService } from '../../../services/resena.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styles: [
  ]
})
export class ResenasComponent implements OnInit, OnDestroy {

  public resenas: Resena[] = [];
  public resenasTemp: Resena[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  public totalResenas: number = 0;
  public desde: number = 0;

  constructor( private resenaService: ResenaService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarResenas();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(500) )
      .subscribe( img => {
        // console.log(img);
        this.cargarResenas();
    } );
  }

  cargarResenas(){
    this.cargando = true;

    this.resenaService.cargarResenas( this.desde )
      .subscribe( ( { total, resenas } ) => {
        this.cargando = false;
        // console.log(medicos);
        this.totalResenas = total;
        this.resenas = resenas;
        
      } )
  }


  cambiarPagina( valor: number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalResenas ){
      this.desde -= valor;
    }

    this.cargarResenas();
  }


  eliminarResena( resena: Resena ){
    
    Swal.fire({
      title: '¿Borrar la reseña?',
      text: `Está a punto de borrar la reseña: ${resena.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resenaService.eliminarResena(resena._id)
          .subscribe( resp => {
            this.cargarResenas();

            Swal.fire(
              'Eliminado!',
              `La reseña ${resena.nombre} a sido eliminado.`,
              'success'
            );            
          } )
      }
    })
  }


  buscar( termino: string ){

    if(termino.length === 0){
      return this.cargarResenas();
    }

    this.busquedasService.buscar( 'resenas', termino )
      .subscribe( (resultados:any) => {
        // console.log(resultados);
        this.resenas = resultados;
        
      } )
  }


  abrirModal( resena: Resena ){
    this.modalImagenService.abrirModal( 'resenas', resena._id, resena.img );
  }

}
