import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Producto } from '../models/producto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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

  cargarProductos(){
    //http://localhost:3005/api/hospitales
    const url = `${ base_url }/productos`;
    // A diferencia del servicio usuario, este lo crearemos así para evitar
    // crear instancias y mediante un pipe, poder mostrar la imagen.
    return this.http.get( url, this.header )
      .pipe(
        map( (resp: {ok: boolean, productos: Producto[] }) => resp.productos )
      )
  }


  obtenerProductoById( id: string ){
    //http://localhost:3005/api/medicos/5fffa0ad8235b846e4fa8847
    const url = `${ base_url }/productos/${id}`;
    
    return this.http.get( url, this.header )
      .pipe(
        map( (resp: {ok: boolean, producto: Producto }) => resp.producto )
      )
  }

  // crearMedico( medico: Medico ){ al hacerlo así, si o si debe estar el objeto completo. 
  // En el otro caso, al menos los campos señalados
  crearProducto( producto: {nombre: string, hospital: string} ){
    const url = `${ base_url }/productos`;
    
    return this.http.post( url, producto, this.header );
  }

  actualizarProducto( producto: Producto ){
    const url = `${ base_url }/productos/${producto._id}`;
    
    return this.http.put( url, producto, this.header );
  }

  eliminarProducto( _id: string ){
    const url = `${ base_url }/productos/${_id}`;
    
    return this.http.delete( url, this.header );
  }
}
