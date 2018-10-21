import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/service.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  recomendaciones: any;

  constructor(public _usuarioService: UsuarioService,
    public router: Router) {

   }

  ngOnInit() {

    this._usuarioService.recomedaciones().subscribe((resp: any) => {

        this.recomendaciones = resp.recomendaciones;
        console.log(this.recomendaciones);

    });

  }

  getColor( producto: any ) {
    // console.log(producto.notamedia * 10);
    // tslint:disable-next-line:triple-equals

    if (  isNaN(producto.notamedia) ) {
     return '0%';
    }
   // console.log((producto.notamedia * 10) + '%');
   return (producto.notamedia * 10) + '%';
 }

 navegarProducto ( id: any ) {
   // console.log(id);
    this.router.navigate(['/productoUser', id]);
 }

}
