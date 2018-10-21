import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  usuarios: any[] = [];
  productos: any[] = [];


  constructor( public activateRoute: ActivatedRoute,
  public http: HttpClient ) {

    activateRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar( termino );
    });
   }

  ngOnInit() {
  }

  buscar ( termino: string ) {

   const url = URL_SERVICIOS + '/busqueda/bd/' + termino;

  this.http.get( url ).subscribe( (resp: any) => {
    console.log( resp );

    this.usuarios = resp.usuarios;
    this.productos = resp.productos;
  });

  }

}
