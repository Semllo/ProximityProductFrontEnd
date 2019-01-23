import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService, ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { SubCategoria } from '../../models/subcategoria.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  subcategorias: SubCategoria[] = [ {nombre: '', _id: '', categoria: { nombre: '', _id: '' }} ];
  producto: Producto = new Producto('', {nombre: 'Seleccione una categoria', _id: '', categoria: { nombre: '', _id: '' }} );

  constructor(
    public _productoService: ProductoService,
    public _categoriaService: CategoriaService,
    public router: Router,
    public activationRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activationRoute.params.subscribe( params => {
        const id = params['id'];
        if ( id !== 'nuevo' ) {
            this.cargarProducto(id);
        }
    });
   }

  ngOnInit() {
    this._categoriaService.mostrarSubCat( 0, 999 ).subscribe( (subcategorias: any) => {
      // console.log(this.producto.subcategoria);
      this.subcategorias = subcategorias.subcategorias;
      if ( this.producto.subcategoria._id === '' ) {
        this.producto.subcategoria = this.subcategorias[0];
      } else {
        for (let i = 0; i < this.subcategorias.length; i++) {
            if ( this.subcategorias[i]._id === this.producto.subcategoria._id ) {
              this.producto.subcategoria = this.subcategorias[i];
            }
        }
      }
       // console.log(this.subcategorias[0]);
       // console.log (this.subcategorias);

       this.subcategorias.sort( (a, b) => {

        if ( a.nombre < b.nombre ) {
          return -1;
        } else if ( a.nombre > b.nombre ) {
          return 1;
        }
        return 0;
        });

       this.subcategorias.sort( (a, b) => {

          if ( a.categoria.nombre < b.categoria.nombre ) {
            return -1;
          } else if ( a.categoria.nombre > b.categoria.nombre ) {
            return 1;
          }
          return 0;
          });

      });


    this._modalUploadService.notificacion.subscribe( resp => {

        // console.log(resp);
        this.producto.img = resp.producto.img;

    });

    console.log(this.producto);
  }

  guardarProducto ( f: NgForm ) {

    // console.log ( f.valid );
    // console.log ( f.value );

    if ( f.invalid ) {
      return;
    }

    console.log(f.value);

    f.value.precio = Number(f.value.precio);
    if ( isNaN(f.value.precio) ) {
      swal('El precio es incorrecto', 'Introduzca un precio correcto', 'error');
      return;
    }

    this.producto.nombre = f.value.nombre;
    this.producto.descripcion = f.value.descripcion;
    this.producto.precio = f.value.precio;
    this.producto.subcategoria = f.value.subcategoria;


   this._productoService.guardarProducto( this.producto ).subscribe( (resp: any) => {

    // console.log(resp);
    this.producto._id = resp.producto._id;
    this.cargarProducto (this.producto._id);
    this.router.navigate(['/producto', resp.producto._id]);

   });
  }


  cargarProducto ( id: string ) {

    this._productoService.cargarProducto ( id ).subscribe( (resp: Producto) => {

      this.producto = resp;

      console.log(resp);
    });

       // this.producto = this._productoService.getproducto();
       // console.log();

  }


  cambiarFoto() {
  this._modalUploadService.mostrarModal( 'productos', this.producto._id, this.producto );
  }

}
