import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as swal from 'sweetalert';
import swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./login.component.css']
})
export class RegistreComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService ,
    public router: Router
  ) { }

  sonIguales(campo1, campo2): any  {

    return(group: FormGroup) => {

    const pass1 = group.controls[campo1].value;
    const pass2 = group.controls[campo2].value;

    if ( pass1 === pass2 ) {
      return null;
    }

        return{
          sonIguales: true
        };

    };

  }

  ngOnInit() {
    init_plugins();

  this.forma = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    correo: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    password2: new FormControl(null, Validators.required),
    edad: new FormControl(null, Validators.required),
    genero: new FormControl(null, Validators.required),
    pais: new FormControl(null, Validators.required),
    ciudad: new FormControl(null, Validators.required),
    condiciones: new FormControl(false),
  }, { validators: this.sonIguales('password' , 'password2') }

  );

  this.forma.setValue({

  nombre: 'TEST',
  correo: 'test10@test.com',
  password: '123456',
  password2: '123456',
  edad: '06-05-1994',
  genero: 'Femenino',
  pais:  'Es',
  ciudad: 'Al',
  condiciones: true

  });


  }

registrarUsuario() {


  let array: String;

  if ( this.forma.invalid ) {
  console.log('Formulario invalido');
  return;

  }

  if ( !this.forma.value.condiciones ) {
    swal('Acceso denegado', 'Debe aceptar las condiciones' , 'warning');
    return;
  }

  // this.forma.value.edad = '0' + this.forma.value.edad;
  // this.forma.value.edad.replace(/-/g, ' ');

  array = this.forma.value.edad.split('-');

  this.forma.value.edad = array[0] + array[1] + array[2];

   console.log( this.forma.value.edad );

  const usuario = new Usuario(
    this.forma.value.nombre,
    this.forma.value.correo,
    this.forma.value.password,
    this.forma.value.edad,
    this.forma.value.genero,
    this.forma.value.pais,
    this.forma.value.ciudad,
  );



    console.log(usuario);
  // tslint:disable-next-line:max-line-length
  this._usuarioService.crearUsuario( usuario ).subscribe( (resp => this.router.navigate(['/login'])), ( err => {
    if ( err.error.errors.errors.email.path === 'email' ) {
      console.log(err);
      swal('El email ya existe', 'Por favor, introduzca otro!' , 'warning');
      return;
    }
    console.log(err); swal('Acceso denegado', 'Error' , 'error');
  }));

}
}
