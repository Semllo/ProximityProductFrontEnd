import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-criticas',
  templateUrl: './criticas.component.html',
  styleUrls: ['./criticas.component.css']
})
export class CriticasComponent implements OnInit {

  usuario: any;
  criticas: any;

  notas = [0, 1, 2, 3, 4, 5 , 6, 7, 8, 9, 10];

  constructor( public _usuarioService: UsuarioService ) {


    this.usuario =  _usuarioService.usuario;

    _usuarioService.vercriticas().subscribe( resp => {

      this.criticas = resp.criticas;

      console.log(this.criticas);
      for ( let i = 0; i < this.criticas.length; i++ ) {

        if ( this.criticas[i].producto == null ) {
          this.criticas[i].producto = {img: 'xxx'};

        }

      }


    });

    // console.log(this.usuario)
   }

  ngOnInit() {
  }

  guardarCri( actualiza: any,  critica: any) {

    // console.log(this.usuario);

    for ( let i = 0; i < this.usuario.criticas.length; i++) {
      if ( this.usuario.criticas[i]._id === critica._id) {
        this.usuario.criticas[i].nota = actualiza.nota;
        this.usuario.criticas[i].descripcion = actualiza.descripcion;
        this.usuario.criticas[i].nombre = actualiza.nombre;
      }
    }

    // Guardar usuario
    // tslint:disable-next-line:max-line-length
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => {
      swal( 'Critica actualizada', critica.nombre, 'success' );
      console.log(critica.producto);
      if ( critica.producto._id ) {
        this._usuarioService.actualizarMedia(  critica.producto._id ).subscribe( respp => console.log(respp) );
      }
    }, err => {swal( 'Error al actualizar el usuario', critica.nombre, 'error' ); });

  }

  mostrarUnUsuario() {

    this._usuarioService.mostrarUnUsuario().subscribe( resp => {
      this.usuario =  resp.usuarios;
      this._usuarioService.usuario =  resp.usuarios;
      this.criticas = resp.usuarios.criticas;

      for ( let i = 0; i < this.criticas.length; i++ ) {

        if ( this.criticas[i].producto == null ) {
          this.criticas[i].producto = {img: 'xxx'};

        }

      }

    });

  }

  eliminarCri ( critica: any ) {

    // console.log(critica);

    // tslint:disable-next-line:max-line-length
    this._usuarioService.eliminarcritica( critica._id , critica.producto._id ).subscribe( resp => {
      this.mostrarUnUsuario();
      // console.log(resp);
     });

  }

}
