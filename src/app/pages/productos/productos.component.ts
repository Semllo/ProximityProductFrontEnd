import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  desde = 0;

  constructor(
    public _productosService: ProductoService,
    public router: Router
   ) { }

  ngOnInit() {
    this.cargarProductos();
  }

cargarProductos() {
  // tslint:disable-next-line:max-line-length
  this._productosService.cargarProductos( this.desde ).subscribe( (productos: any) => {this.productos = productos; console.log(productos); });
}

buscarProducto ( termino: string ) {

  if ( termino.length <= 0 ) {

    this.cargarProductos();
    return;

  }

  this._productosService.buscarProductos ( termino ).subscribe( (productos: Producto[]) => {

    productos.splice(productos.length - 1, 1 ) ;
   // console.log( productos );
    this.productos = productos; });
}

borrarProducto ( producto: any ) {

  if (this.desde >= (this._productosService.totalProductos - 1) && this._productosService.totalProductos > 5) {
    this.desde = this.desde - 5;
  }

  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  });

  swalWithBootstrapButtons({
    title: '¿Esta seguro que quiere eliminar al producto?',
    text: 'El producto: ' + producto.nombre + ' será eliminado!',
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: '<i class="fa fa-times"></i> No, cancelar!',
    confirmButtonText: '<i class="fa fa-check"></i> Si, deseo eliminar el producto!',
    reverseButtons: true
  }).then((borrar) => {

    if (borrar.value) {

      this._productosService.borrarProducto( producto._id ).subscribe( resp => {
        this.cargarProductos();
        swalWithBootstrapButtons( 'Producto eliminado!', 'El producto ha sido eliminado con exito', 'success' );
      }, err => {
        swalWithBootstrapButtons('Error', 'El producto no ha sido eliminado',  'error' );
        });

    } else if (
      // Read more about handling dismissals
      borrar.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons('Operación cancelada', 'El producto no ha sido eliminado', 'error');
    }
  });



}

navegarProducto ( id: any ) {
  // console.log(id);
  this.router.navigate(['/producto', id._id]);
}




cambiarDesde(valor: number) {

  const desde = this.desde + valor;

  console.log(desde);
  console.log(this._productosService.totalProductos);
  // console.log( this.desde);
  if (desde >= this._productosService.totalProductos || desde < 0) {
    return;
  }

  this.desde += valor;
  this.cargarProductos();

  }
}
