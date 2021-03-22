import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Resena } from '../models/resena.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get header() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarResenas( desde: number = 0 ){
    //http://localhost:3005/api/hospitales

    const url = `${ base_url }/resenas?desde=${ desde }`;
    
    // A diferencia del servicio usuario, este lo crearemos así para evitar
    // crear instancias y mediante un pipe, poder mostrar la imagen.
    return this.http.get( url, this.header )
      .pipe(
        map( (resp: {ok: boolean, resenas: Resena[], total }) => {
          
          // resp.resenas
          return {
            total: resp.total,
            resenas: resp.resenas
          };
        } )
      )
  }


  obtenerResenaById( id: string ){
    //http://localhost:3005/api/medicos/5fffa0ad8235b846e4fa8847
    const url = `${ base_url }/resenas/${id}`;
    
    return this.http.get( url, this.header )
      .pipe(
        map( (resp: {ok: boolean, resena: Resena }) => resp.resena )
      )
  }

  crearResena( resena: {titulo: string, subtitulo: string, descripcion: string} ){
    const url = `${ base_url }/resenas`;
    
    return this.http.post( url, resena, this.header );
  }
  

  actualizarResena( resena: Resena ){
    const url = `${ base_url }/resenas/${resena._id}`;
    
    return this.http.put( url, resena, this.header );
  }


  eliminarResena( _id: string ){
    const url = `${ base_url }/resenas/${_id}`;
    
    return this.http.delete( url, this.header );
  }

}
