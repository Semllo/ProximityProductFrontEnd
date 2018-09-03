import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { renderDetachView } from '../../../../node_modules/@angular/core/src/view/view_attach';
import { resolve } from 'dns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    console.log(this.usuario);

    this._usuarioService.actualizarUsuario( this.usuario ).subscribe();

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
