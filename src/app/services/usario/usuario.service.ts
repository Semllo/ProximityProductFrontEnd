import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subirArchivo/subir-archivos.service';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class UsuarioService {

    usuario: Usuario;
    token: string;
    menu: any = [];

    constructor( public http: HttpClient,
      public router: Router,
      public _subirArchivoService: SubirArchivosService
    ) {

      this.cargarStorage();

    }

    renuevaToken() {

    const url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;
    return this.http.get( url ).map( (resp: any) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
     });

    }


    estaLogueado() {
    return( this.token.length > 5 ) ? true : false;
    }

    logout() {
      this.usuario = null;
      this.token = '';
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('menu');

    }

    cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));

      // console.log(this.usuario);
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }


    return (this.usuario);
    }

    guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;

    }

    loginGoogle( token: string ) {

      const url = URL_SERVICIOS + '/login/google';

      return this.http.post(url, {token: token}).map(  (resp: any) => {

        this.guardarStorage( resp.id , resp.token, resp.usuario , resp.menu );
        console.log(resp);
        return true;

      });

    }


    login( usuario: Usuario, recordar: boolean = false ) {

      if ( recordar ) {
        localStorage.setItem( 'email', usuario.email );
      } else {
        localStorage.removeItem( 'email' );
      }

      const url = URL_SERVICIOS + '/login';
      return this.http.post( url , usuario ).map((resp: any) => {

        this.guardarStorage( resp.id , resp.token, resp.usuario, resp.menu );
        console.log(resp);
        return true;

      });

    }

    crearUsuario( usuario: Usuario ) {
        const url = URL_SERVICIOS + '/usuario';
       return this.http.post( url , usuario ).map( (resp: any) => {

        swal ('Usuario creado correctamente', usuario.email, 'success' );
        return resp.usuario;

       });

    }

    actualizarUsuario( usuario: Usuario ) {

      const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
      // console.log( url );

      return this.http.put( url, usuario ).map( (resp: any) => {
        // console.log( resp.usuario);
        if ( usuario._id === this.usuario._id ) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }
        return resp;
      });

    }

    cambiarImagen ( archivo: File, id: string ) {

      this._subirArchivoService.subirArchivo( archivo , 'usuarios', id  ).then( (resp: any) => {
        console.log( resp );

        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre ,  'success');
        this.guardarStorage( id, this.token, this.usuario, this.menu );

       }).catch( resp => {
      //  console.log(resp);
       } );

    }

  cargarUsuarios( desde: number = 0 ) {

  const url = URL_SERVICIOS + '/usuario?desde=' + desde;
  console.log(url);
  return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.usuarios );

  }

  borrarUsuario( id: string ) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete( url );

  }


  crearCritica( criticia ) {

    const url = URL_SERVICIOS + '/critica/' + this.usuario._id;

    const valor = {nombre: criticia.nombre, descripcion: criticia.descripcion, nota: criticia.nota, producto: criticia.producto};
   // console.log(valor);


   // console.log( valor.producto );


    return this.http.post( url , valor ).map( (resp: any) => {

      this.actualizarMedia( valor.producto ).subscribe( respp => {
        // console.log(respp);
      });

      // console.log(resp);
      swal ('Critica creada correctamente', '', 'success' );
      this.usuario = resp.criticasGuardadas;
      return resp;

     });

  }

actualizarCritica ( id, lista ) {


  const url = URL_SERVICIOS + '/critica/' + this.usuario._id + '/' + id;

  const valor = {nombre: lista.nombre, descripcion: lista.descripcion, producto: lista.producto, nota: lista.nota};


  // console.log( valor.producto );

  return this.http.put( url, valor ).map( (resp: any) => {

   // console.log(resp);
    this.actualizarMedia( valor.producto ).subscribe( respp => {
     // console.log(respp);
    });
    swal ('Critica actualizada correctamente', '', 'success' );
    return resp;

   });

}


   eliminarcritica( id, producto? ) {

    const url = URL_SERVICIOS + '/critica/' + this.usuario._id + '/' + id;

   // console.log( producto );

    return this.http.delete( url ).map( (resp: any) => {

      if ( producto ) {
      this.actualizarMedia( producto ).subscribe( respp => {
      // console.log(respp);
      });
      }
      // console.log(resp);
      return resp;

     });

   }

   actualizarMedia ( id ) {

    let url;

    if (id._id) {
       url = URL_SERVICIOS + '/critica/' + id._id;
     } else {
        url = URL_SERVICIOS + '/critica/' + id;
     }

    console.log(url);
    return this.http.put( url, id ).map( (resp: any) => {

      console.log(resp);
      return resp;

     });

   }

   vercriticas () {

    const url = URL_SERVICIOS + '/critica/' + this.usuario._id;
    return this.http.get( url ).map( (resp: any) => {

      console.log(resp);
      return resp;

     });

   }


   añadirAdeseos ( id , lista ) {

    const url = URL_SERVICIOS + '/listadedeseos/' + this.usuario._id + '/' + id;
    console.log(lista);
    return this.http.put( url, lista ).map( (resp: any) => {

     // console.log(resp);
      return resp;

     });

   }




   mostrarUnUsuario () {

    const url = URL_SERVICIOS + '/usuario/' + this.usuario._id;

    return this.http.get( url ).map( (resp: any) => {

     // console.log(resp);
      return resp;

     });

   }

   recomedaciones () {

    const url = URL_SERVICIOS + '/kmeans/' + this.usuario._id;

    return this.http.get( url ).map( (resp: any) => {

        return resp;

    });

  }

}
