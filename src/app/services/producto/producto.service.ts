import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';

@Injectable()
export class ProductoService {

  totalProductos = 0;
  desde = 0;
  producto;

  constructor( public http: HttpClient,
    public router: Router
  ) {

  }


  cargarProductos( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/producto?desde=' + desde;
    // console.log(url);
    return this.http.get( url ).map( (resp: any) => {

      this.totalProductos = resp.total;
      return resp.productos;

    });

    }

    cargarProductosPop( desde: string = '' ) {

      const url = URL_SERVICIOS + '/indicadores/desc/popularidad' + desde;
      // console.log(url);
      return this.http.get( url );

      }

      buscarProductos( termino: string ) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/productos/' + termino;
        return this.http.get( url ).map( (resp: any) => resp.productos );

      }

      cambiarDesde(valor: number) {

        const desde = this.desde + valor;

        if (desde >= this.totalProductos || desde < 0) {
          return;
        }

       this.desde += valor;
        this.cargarProductos();

        }

        borrarProducto ( id: string ) {

          const url = URL_SERVICIOS + '/producto/' + id;

          return this.http.delete(  url ).map((resp: any) => {
            swal('Producto eliminado', 'El producto ha sido borrado correctamente', 'success' );
            return resp;
          });

        }

        guardarProducto( producto: Producto ) {

          let url = URL_SERVICIOS + '/producto';

          if ( producto._id ) {

            url += '/' + producto._id;
            return this.http.put(url, producto).map( resp => {
              swal('Producto actualizado', producto.nombre, 'success');
              return resp; });

          } else {

             // tslint:disable-next-line:arrow-return-shorthand
             return this.http.post(url, producto).map( resp => {
              swal('Producto creado', producto.nombre, 'success');
              return resp; });

          }


        }

        cargarProducto ( id: string ) {
          const url = URL_SERVICIOS + '/producto/' + id;
          return this.http.get( url ).map( (resp: any) => {
            // console.log(resp);
            return resp.productos;
          });

        }

        setproducto (producto) {
          this.producto = producto;
        }

        getproducto () {
           return this.producto;
        }
}
