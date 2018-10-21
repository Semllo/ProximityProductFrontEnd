import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { renderDetachView } from '@angular/core/src/view/view_attach';
import { resolve } from 'dns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  fecha: string;
  generos = ['Femenino', 'Masculino'];
  genero: string;
  seleccion: string;


  imagenSubir: File;
  imagenTemp: string;



  constructor( public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
    // console.log(this.usuario);
    if ( this.usuario.edad === undefined ) {
        this.fecha = '';
    } else {
      this.fecha = this.usuario.edad.substring(6, 8 ) + '/' + this.usuario.edad.substring(4, 6 ) + '/' + this.usuario.edad.substring(0, 4 );
    }

    if ( Boolean(this.usuario.genero) === true ) {

      this.genero = 'Femenino';
    } else {
      this.genero = 'Masculino';
    }

   }

  ngOnInit() {

  }

  guardar( usuario: any ) {

  console.log(this.usuario);
    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    // Validar genero


    if ( this.genero === 'Femenino'  ) {
      // console.log('Mujer');
      this.usuario.genero = 'true';
    } else {
      this.usuario.genero = 'false';
    }


    // Validar fecha
    const array = usuario.fecha.split('/');

    if ( array[1].length === 1 ) {
      array[1] = '0' + array[1];
    }

    if ( array[0].length === 1 ) {
      array[0] = '0' + array[0];
    }


    if ( array[0] > 31 || array[1] > 12 || array[1].length !== 2 || array[0].length !== 2 || array[2].length !== 4 ) {
      swal('Fecha incorrecta', 'Por favor, introduzca una fecha valida', 'error' );
      return;
    }

    this.usuario.edad = array[2] + array[1] + array[0];

     console.log(this.usuario);

     // Guardar usuario
    // tslint:disable-next-line:max-line-length
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => {swal( 'Usuario actualizado', usuario.nombre, 'success' ); }, err => {swal( 'Error al actualizar el usuario', usuario.nombre, 'error' ); });

  }

  seleccionImage( archivo: File ) {

      if ( !archivo ) {
        this.imagenSubir = null;
        return;
      }

      if ( archivo.type.indexOf('image') < 0 ) {
        swal('El archivo no es una imagen valida', 'Por favor, introduzca una imagen', 'error' );
        this.imagenSubir = null;
        return;
      }

      console.log( archivo );
      this.imagenSubir = archivo;

      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL( archivo );

      reader.onloadend = () => this.imagenTemp = reader.result;

  }

  canbiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
