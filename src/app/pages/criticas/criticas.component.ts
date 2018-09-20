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

  notas = [0, 1, 2, 3, 4, 5 , 6, 7, 8, 9, 10];

  constructor( public _usuarioService: UsuarioService ) {
    this.usuario =  _usuarioService.usuario;


    for ( let i = 0; i < this.usuario.criticas.length; i++ ) {

      if ( this.usuario.criticas[i].producto == null ) {
        this.usuario.criticas[i].producto = {img: 'xxx'};

      }

    }
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

    // console.log(this.usuario);
    // Guardar usuario
    // tslint:disable-next-line:max-line-length
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => { swal( 'Critica actualizada', critica.nombre, 'success' ); }, err => {swal( 'Error al actualizar el usuario', critica.nombre, 'error' ); });


  }

}
