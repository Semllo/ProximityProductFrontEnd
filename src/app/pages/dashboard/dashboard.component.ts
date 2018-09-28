import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  productos: any;
  productospop: any;

  constructor( public _usuarioService: ProductoService,
    public router: Router ) {

    this._usuarioService.cargarProductos().subscribe ( (resp: any) => {
       console.log(resp);
      this.productos = resp;
      for ( let i = 0; i < resp.length; i++ ) {
        this.productos[i].notamedia = Math.round(this.productos[i].notamedia * 10) / 10;
      }
    });

    this._usuarioService.cargarProductosPop().subscribe ( (resp: any) => {

      this.productospop = resp.productos;
      for ( let i = 0; i < resp.productos.length; i++ ) {
        this.productospop[i].notamedia = Math.round(this.productospop[i].notamedia * 10) / 10;
      }

    });


  }

  ngOnInit() {
  }

  mostrarProductos() {
    this._usuarioService.cargarProductos().subscribe ( (resp: any) => {

      // console.log(resp);

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
