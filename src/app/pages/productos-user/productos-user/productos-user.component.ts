import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService, UsuarioService } from '../../../services/service.index';
import { Producto } from '../../../models/producto.model';
import { Usuario } from '../../../models/usuario.model';
import { Criticas } from '../../../models/criticas.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos-user',
  templateUrl: './productos-user.component.html',
  styleUrls: ['./productos-user.component.css']
})
export class ProductosUserComponent implements OnInit {

  producto: Producto = new Producto('');
  usuario: Usuario = new Usuario('', '', '');
  critica: Criticas;
  notas = [ 'Sin voto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  id: any;
  deseo: any = 'Sin listas de deseos';

  constructor(
    public activationRoute: ActivatedRoute,
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService
  ) {



    this.usuario = _usuarioService.usuario;
    // console.log(this.usuario);
    activationRoute.params.subscribe( params => {
      this.id = params['id'];
      this.critica = new Criticas( 'Sin voto', '', this.id);
      if ( this.id !== 'nuevo' ) {
        this.cargarProducto(this.id);
      }
    });

    _usuarioService.vercriticas().subscribe( resp => {

      for ( let i = 0; i < resp.criticas.length; i++ ) {

        // tslint:disable-next-line:triple-equals
        if ( resp.criticas[i].producto != null && resp.criticas[i].producto._id + '' == this.id ) {
            this.producto = resp.criticas[i].producto;
            this.critica = resp.criticas[i];
          //  console.log(this.producto);
        }
      }

    });

    if ( this.usuario.listasDeDeseos[0] ) {
      this.deseo = this.usuario.listasDeDeseos[0];
    //  console.log(this.deseo);
    } else {
      this.deseo = 'Sin listas de deseos';
    }

  }

  ngOnInit() {
  }

  cargarProducto ( id: string ) {

    this._productoService.cargarProducto ( id ).subscribe( (resp: any) => {

      this.producto = resp;
     console.log(this.producto);

    });

  }

  getColor( producto: any ) {
    // console.log(producto.notamedia * 10);
    // tslint:disable-next-line:triple-equals

    if (  isNaN(producto.notamedia) ) {
     return '0%';
    }
   // console.log((producto.notamedia * 10) + '%');
   return (producto.notamedia * 10) + '%';
 }

  guardarCri (critica: any) {

      // console.log(critica);
      // console.log(this.usuario);

    /* if (critica.nombre === undefined || critica.nombre === '') {
      swal('Introduzca el nombre', critica.nombre, 'error');
      return;
    } */

    if (critica.nota === 'Sin voto') {
      swal('Introduzca una nota', 'Debe votar antes de escribir una critica', 'error');
      return;
    }

   this.critica = critica;


   // console.log(this.critica);
   if ( this.critica._id === '' ) {
       this._usuarioService.crearCritica ( this.critica ).subscribe( resp => {
       this.critica = resp.criticasGuardadas.criticas[ resp.criticasGuardadas.criticas.length - 1 ];
       this.cargarProducto( this.id );
       // console.log(resp);
     });
   } else {

    this._usuarioService.actualizarCritica (this.critica._id , this.critica ).subscribe( resp => {
      // console.log(resp);
      this._usuarioService.actualizarMedia( this.id ).subscribe( respp => this.cargarProducto( this.id ) );
      this.critica = resp.criticas;
      // console.log('actualizar cri');
    });
   }


  }



  listaDeseos ( deseos ) {

    let deseo;
     console.log( deseos );

    deseo =  {nombre: deseos.nombre, producto : [''], _id: deseos._id };

    if (deseos.producto[0] !== undefined && deseos.producto[0].nombre === 'Lista vacia' ) {

      deseo.producto[ 0 ] =  this.producto._id ;
      console.log('Vacia');

    } else {

      for ( let i = 0; i < deseos.producto.length; i++ ) {
        deseo.producto[i] =  deseos.producto[i];
      }

      // console.log( deseo );

        deseo.producto[ deseos.producto.length ] =  this.producto._id ;

    }


        console.log( deseo );
    this._usuarioService.añadirAdeseos( deseos._id , deseo ).subscribe( resp => {
      this._usuarioService.usuario = resp.listadedeseos;
       console.log(resp);
    });

  }
}
