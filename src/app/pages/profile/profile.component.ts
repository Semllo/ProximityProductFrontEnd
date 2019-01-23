import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { renderDetachView } from '@angular/core/src/view/view_attach';
import { resolve } from 'dns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})


export class ProfileComponent implements OnInit {


  usuario: Usuario;
  fecha: string;
  generos = ['Femenino', 'Masculino'];
  genero: string;
  seleccion: string;


  imagenSubir: File;
  imagenTemp: string;


  // Radar
  public radarChartLabels = [];  // Categorias

  public radarChartData = [
    {data: [], label: 'Votos'},
    {data: [], label: 'Notas'},
    {data: [], label: 'Mis gustos'}
  ];
  public radarChartType = 'radar';


// Pie
public pieChartType = 'pie';
 // tslint:disable-next-line:max-line-length
 public pieChartLabels: string[] = ['Muy malo(1)', 'Malo(2)', 'Flojo(3)', 'Regular(4)', 'Pasable(5)', 'Interesante(6)', 'Bueno(7)', 'Notable(8)', 'Muy bueno(9)', 'Excelente(10)'];     // Notas
 public pieChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                          // Numero de votos por nota


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


    if (!Array.prototype.unique) {
      Array.prototype.unique = function(a) {
        return function() { return this.filter(a); }; }(function(a, b, c) { return c.indexOf(a, b + 1) < 0;
      });
    }


    this._usuarioService.mostrarUnUsuario().subscribe( (resp: any) => {
      console.log( resp );

      this.radarChartLabels = [''];

      // tslint:disable-next-line:prefer-const
      let medias = [];
      // tslint:disable-next-line:prefer-const
      let acumulado = [];
      // tslint:disable-next-line:prefer-const
      let ocurrencias = [];


      this.pieChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for ( let i = 0; i < resp.usuarios.criticas.length; i++ ) {
        this.pieChartData[resp.usuarios.criticas[i].nota - 1] = this.pieChartData[resp.usuarios.criticas[i].nota - 1] + 1;

          this.radarChartLabels[i] = resp.usuarios.criticas[i].producto.subcategoria.nombre;

      }

      this.radarChartLabels = this.radarChartLabels.unique();

      for ( let j = 0; j < this.radarChartLabels.length; j++ ) {
              acumulado[j] = 0;
              ocurrencias[j] = 0;
      }

      for ( let i = 0; i < resp.usuarios.criticas.length; i++ ) {
        for ( let j = 0; j < this.radarChartLabels.length; j++ ) {

        if ( this.radarChartLabels[j] === resp.usuarios.criticas[i].producto.subcategoria.nombre ) {
              acumulado[j] = acumulado[j] + resp.usuarios.criticas[i].nota;
              ocurrencias[j] = ocurrencias[j] + 1;

          }
        }
      }

      for ( let j = 0; j < this.radarChartLabels.length; j++ ) {
         medias[j] = acumulado[j] / ocurrencias[j];
         this.radarChartData[0].data[j] = ocurrencias[j];
         this.radarChartData[1].data[j] = medias[j];
      }

      let max = 0;
      for ( let j = 0; j < ocurrencias.length; j++ ) {
        if ( ocurrencias[j] > max ) {
            max = ocurrencias[j];
        }
      }

      for ( let j = 0; j < this.radarChartLabels.length; j++ ) {
        medias[j] = acumulado[j] / ocurrencias[j];
        this.radarChartData[0].data[j] = (ocurrencias[j] * 100) / max;
        this.radarChartData[1].data[j] = medias[j] * 10;
        this.radarChartData[2].data[j] = (this.radarChartData[0].data[j] + this.radarChartData[1].data[j]) / 2;
     }

     // Calcular % en ocurrencies y convinat entre els dos

      console.log( this.radarChartData );

      console.log( this.radarChartLabels );
    });


   }

  ngOnInit() {

  }




  public randomizeType(): void {
    // this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
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


declare global {
  interface Array<T> {
      unique(): Array<T>;
  }
}
