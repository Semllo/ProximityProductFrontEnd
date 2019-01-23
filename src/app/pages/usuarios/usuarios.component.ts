import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
   // console.log( this.usuarios );
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe ( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {

    this._modalUploadService.limpiarModal();
    this._modalUploadService.mostrarModal( 'usuarios', id );

  }

  cargarUsuarios() {

      this.cargando = true;

      this._usuarioService.cargarUsuarios( this.desde ).subscribe ( (resp: any) => {
          // console.log(resp.usuarios[0].listasDeDeseos);
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
      });

  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

    }


  buscarUsuario( termino: string ) {

  if ( termino.length <= 0 ) {

    this.cargarUsuarios();
    return;

  }

  this.cargando = true;
  this._usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[]) => {

    console.log (usuarios);
    this.usuarios = usuarios;
    this.cargando = false;

  });

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ) {

      swal ('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;

    }

    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: '¿Esta seguro que quiere eliminar al usuario?',
      text: 'El usuario ' + usuario.nombre + ' será eliminado',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '<i class="fa fa-times"></i> No, cancelar!',
      confirmButtonText: '<i class="fa fa-check"></i> Si, deseo eliminar al usuario!',
      reverseButtons: true
    }).then((borrar) => {

      if (borrar.value) {

        this._usuarioService.borrarUsuario( usuario._id ).subscribe( resp => {
          if (this.desde >= (this.totalRegistros - 1)) {
            this.desde = this.desde - 5;
              this.cambiarDesde(this.desde);
          } else { this.cargarUsuarios(); }
          swalWithBootstrapButtons( 'Usuario eliminado!', 'El usuario ha sido eliminado con exito', 'success' );
         }, err => {
           swalWithBootstrapButtons('Error', 'El usuario no ha sido eliminado',  'error' );
           });

      } else if (
        // Read more about handling dismissals
        borrar.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons('Operación cancelada', 'El usuario no ha sido eliminado', 'error');
      }
    });


  }

  guardarUsuario ( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }

}
