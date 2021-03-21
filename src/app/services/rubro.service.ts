import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Rubro } from '../models/rubro.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  // public hospitales: Hospital;

  constructor( private http: HttpClient ) { 
  }

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

  cargarRubros(){
    //http://localhost:3005/api/hospitales
    const url = `${ base_url }/rubros`;
    // A diferencia del servicio usuario, este lo crearemos así para evitar
    // crear instancias y mediante un pipe, poder mostrar la imagen.
    return this.http.get( url, this.header )
      .pipe(
        map( (resp: {ok: boolean, rubros: Rubro[] }) => resp.rubros )
      )
  }

  crearRubro( nombre: string ){
    const url = `${ base_url }/rubros`;
    
    return this.http.post( url, {nombre}, this.header );
  }

  actualizarRubro( _id: string , nombre: string ){
    const url = `${ base_url }/rubros/${_id}`;
    
    return this.http.put( url, {nombre}, this.header );
  }

  eliminarRubro( _id: string ){
    const url = `${ base_url }/rubros/${_id}`;
    
    return this.http.delete( url, this.header );
  }

}
