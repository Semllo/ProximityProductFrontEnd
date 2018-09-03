import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';
import swal from 'sweetalert2';
import { NgZone } from '@angular/core';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

  this.email = localStorage.getItem('email') || '';
  if ( this.email.length > 1 ) {
    this.recuerdame = true;
  }

  }


   googleInit() {

    gapi.load('auth2', () => {

  this.auth2 = gapi.auth2.init({
    client_id: '360197513576-npqoqkrqr0s24uh8fhtv4thht4s2oaj5.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    scope: 'profile email'
    });

    this.attachSignin( document.getElementById('btnGoogle'));

    });


   }

   // tslint:disable-next-line:no-shadowed-variable
   attachSignin( element ) {

    this.auth2.attachClickHandler(element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      this.zone.run( () => {
        this._usuarioService.loginGoogle( token ).subscribe( isLogueado =>  this.router.navigate(['/dashboard']));
      });
    });

   }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      swal({ type: 'error', title: 'Correo o contraseña incorrectos', text: 'Intentelo de nuevo' });
      return; }

    const usuario = new Usuario(null, forma.value.email, forma.value.password );

    // tslint:disable-next-line:max-line-length
    this._usuarioService.login( usuario, forma.value.recuerdame ).subscribe(
      correcto => { this.router.navigate(['/dashboard']); },
      // tslint:disable-next-line:max-line-length
      err => { swal({ type: 'error', title: 'Correo o contraseña incorrectos', text: 'Intentelo de nuevo' });
      console.log(err); }
    );


  }

}
