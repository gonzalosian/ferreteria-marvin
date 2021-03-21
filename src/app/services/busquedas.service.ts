import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment'

import { Usuario } from '../models/usuario.model';
// import { Noticia } from '../models/noticia.model';
import { Producto } from '../models/producto.model';
import { Rubro } from '../models/rubro.model';

const base_url = environment.base_url;
const tipo = [];
let termino = '';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ):Usuario[] {
    return resultados.map(
      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    )
  }

  private transformarProductos( resultados: any[] ):Producto[] {
    return resultados;
  }

  private transformarRubros( resultados: any[] ):Rubro[] {
    return resultados;
  }

  // private transformarNoticias( resultados: any[] ):Noticia[] {
  //   return resultados;
  // }


  busquedaGlobal( termino: string ){
    const url = `${ base_url }/todo/${ termino }`;

    return this.http.get( url, this.header );
  }


  buscar( 
    tipo: 'usuarios'|'productos'|'rubros'|'noticias',
    termino: string ) {
    // http://localhost:3005/api/todo/coleccion/usuarios/al
    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;

    return this.http.get<any[]>( url, this.header )
      .pipe(
        map( (resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultado );
            case 'productos':
              return this.transformarProductos( resp.resultado );
            case 'rubros':
              return this.transformarRubros( resp.resultado );
            // case 'noticias':
            //   return this.transformarNoticias( resp.resultado );
          
            default:
              return [];
          }

        } )
      );
  }

}