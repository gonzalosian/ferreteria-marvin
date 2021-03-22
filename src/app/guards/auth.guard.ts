import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService,
               private router: Router ){
    
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado => {

            if( !estaAutenticado ){
              this.router.navigateByUrl('/login');
            }
            
          } )
        );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // console.log('Pasó por el CanActivate del guard');
      
      // this.usuarioService.validarToken()
      //   .subscribe( resp => {
      //     console.log(resp);
          
      //   } )

      // return true;

      return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado => {

            // if( !estaAutenticado ){
            //   this.router.navigateByUrl('/login');
            // }
            
          } )
        );
    }
  
}
