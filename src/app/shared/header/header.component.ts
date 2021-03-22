import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) { 

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }


  buscar( termino: string ){
    // console.log(termino);
    if( termino.length === 0 ){
      // this.router.navigateByUrl(`/dashboard`);
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }


  logout(){
    this.usuarioService.logout();
  }

}
