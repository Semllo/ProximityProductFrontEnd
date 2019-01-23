import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/service.index';

@Component({
  selector: 'app-verporcat',
  templateUrl: './verporcat.component.html',
  styleUrls: ['./verporcat.component.css']
})
export class VerporcatComponent implements OnInit {

  productos: any;

  constructor(public activationRoute: ActivatedRoute,
  public _productoService: ProductoService,
  public router: Router) {
    activationRoute.params.subscribe( params => {
      const id = params['id'];

      this._productoService.cargarProductosPorCat( id, 0, 25 ).subscribe( (resp: any) => {

      console.log(resp);
      this.productos = resp;

      });

    });

   }

  ngOnInit() {
  }

  navegarProducto ( id: any ) {
    // console.log(id);
     this.router.navigate(['/productoUser', id]);
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
}
