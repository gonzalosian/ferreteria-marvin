import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';
import { Rubro } from '../../models/rubro.model';
// import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public productos: Producto[] = [];
  public rubros: Rubro[] = [];
  // public noticias: Noticia[] = [];
  
  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService,
               private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({termino}) => {
        // console.log(termino);
        this.busquedaGlobal( termino );
        
      } )
  }


  busquedaGlobal( termino: string ){
    this.busquedasService.busquedaGlobal( termino )
      .subscribe( (resp: any) => {
        // console.log(resp);
        this.usuarios = resp.usuarios;
        this.productos = resp.productos;
        this.rubros = resp.rubros;
        // this.noticias = resp.noticias;
      } )
  }

  abrirProducto(producto: Producto){
    // console.log(producto);
    this.router.navigateByUrl(`/dashboard/producto/${producto._id}`);
  }

}
