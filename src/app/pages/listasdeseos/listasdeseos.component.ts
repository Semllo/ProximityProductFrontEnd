import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listasdeseos',
  templateUrl: './listasdeseos.component.html',
  styleUrls: ['./listasdeseos.component.css']
})
export class ListasdeseosComponent implements OnInit {

    usuario: any;
    deseo: any;

    constructor( public _usuarioService: UsuarioService ) {
      this.usuario = _usuarioService.usuario;

      // console.log(this.usuario);
      for ( let i = 0; i < this.usuario.listasDeDeseos.length; i++) {
        if ( this.usuario.listasDeDeseos[i].producto.length === 0) {
         this.usuario.listasDeDeseos[i].producto[0] = {nombre: 'Lista vacia'};
        }
       }

      // console.log(this.usuario);
     }


    ngOnInit() {

      this._usuarioService.mostrarUnUsuario().subscribe( resp => {

        this.usuario = resp.usuarios;
       // console.log(this.usuario);
      for ( let i = 0; i < this.usuario.listasDeDeseos.length; i++) {
        if ( this.usuario.listasDeDeseos[i].producto.length === 0) {
         this.usuario.listasDeDeseos[i].producto[0] = {nombre: 'Lista vacia'};
        }
       }
        console.log(this.usuario);

      });


    }

    cargarUsuarios() {

      this.usuario = this._usuarioService.cargarStorage();

  }

  borrar( id ) {

    for ( let i = 0; i < this.usuario.listasDeDeseos.length; i++) {
      if (this.usuario.listasDeDeseos[i]._id === id) {
        this.usuario.listasDeDeseos.splice(i, 1);
      }

  }

  // tslint:disable-next-line:max-line-length
  this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => { swal( 'Lista eliminada', '', 'success' ); this.cargarUsuarios(); }, err => {swal( 'Error eliminando la lista', '', 'error' ); });

  }

    nueva( nombre: any ) {

      this.usuario.listasDeDeseos[this.usuario.listasDeDeseos.length] = { nombre: nombre, producto: [{ nombre: 'Lista vacia' }] };

      // tslint:disable-next-line:max-line-length
      this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => { swal( 'Nuevo nombre añadido', nombre, 'success' ); this.cargarUsuarios(); }, err => {swal( 'Error añadir la nueva lista', nombre, 'error' ); });


    }

    guardar( titulo: any, id: any ) {

      for ( let i = 0; i < this.usuario.listasDeDeseos.length; i++) {
          if (this.usuario.listasDeDeseos[i]._id === id) {
            this.usuario.listasDeDeseos[i].nombre = titulo;
          }

      }

      // tslint:disable-next-line:max-line-length
      this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => { swal( 'Nombre actualizado', titulo, 'success' ); this.cargarUsuarios(); }, err => {swal( 'Error al eliminar el producto', titulo, 'error' ); });

    } // fin guardar

    borrarProducto(producto: any, lista: any) {

      // console.log(producto);

      // console.log(lista);
       let idLista: any;
       let idPro: any;
       let a: any;


       // console.log(this.usuario);
       // console.log('llega');
       if ( producto.deseo === 'Lista vacia' || this.usuario.listasDeDeseos[0].producto.length === 0 ) {
        swal( 'Error al actualizar la lista', 'La lista no contiene productos', 'error' );
        return; }

      //  console.log('llega');

      for (let i = 0 ; i < lista.producto.length; i++) {
        if ( lista.producto[i].nombre === producto.deseo ) {
            idPro = lista.producto[i]._id;
            idLista = lista._id;
            lista.producto.splice(i, 1);
        }
      }



        for ( let i = 0; i <= this.usuario.listasDeDeseos.length - 1; i++) {
           console.log('llega');
          if ( this.usuario.listasDeDeseos[i]._id === idLista) {
            a = i;

            if ( this.usuario.listasDeDeseos[i].producto.length > 0 ) {

              for ( let j = 0; j < this.usuario.listasDeDeseos[i].producto.length - 1; j++) {

                if ( this.usuario.listasDeDeseos[i].producto[j]._id === idPro ) {
                  if ( this.usuario.listasDeDeseos[i].producto.length <= 1) {
                    console.log(this.usuario);
                    this.usuario.listasDeDeseos[i].producto[0] = {nombre: 'Lista vacia'};
                    } else {
                      console.log(this.usuario);
                    this.usuario.listasDeDeseos[i] = lista;
                   }
                }
              }

            } else {

              this.usuario.listasDeDeseos[i].producto[0] = {nombre: 'Lista vacia'};

            }
      }
      if ( producto.deseo === 'Lista vacia' || this.usuario.listasDeDeseos[0].producto.length === 0 ) {
        console.log(this.usuario);
        this.usuario.listasDeDeseos[i].producto[0] = [{nombre: 'Lista vacia'}];
       }

       console.log(this.usuario);
       // console.log(this.usuario);
      }


      // tslint:disable-next-line:max-line-length
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => { console.log(resp); swal( 'Producto eliminado de la lista', producto.deseo, 'success' ); this.cargarUsuarios(); }, err => {swal( 'Error al eliminar el producto', producto.deseo, 'error' ); });


  } // fin borrarProducto


}
