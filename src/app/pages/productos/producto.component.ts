import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService, ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { SubCategoria } from '../../models/subcategoria.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


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
    this._categoriaService.mostrarSubCat().subscribe( (subcategorias: any) => {
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
    });


    this._modalUploadService.notificacion.subscribe( resp => {

        console.log(resp);
        this.producto.img = resp.producto.img;

    });
  }

  guardarProducto ( f: NgForm ) {

    // console.log ( f.valid );
    // console.log ( f.value );

    if ( f.invalid ) {
      return;
    }

    this.producto.nombre = f.value.nombre;
    this.producto.descripcion = f.value.descripcion;
    this.producto.precio = f.value.precio;
    this.producto.subcategoria = f.value.subcategoria;


   this._productoService.guardarProducto( this.producto ).subscribe( (resp: any) => {

    // console.log(resp);
    this.producto._id = resp.producto._id;
    this.router.navigate(['/producto', resp.producto._id]);


   } );
  }


  cargarProducto ( id: string ) {

    this._productoService.cargarProducto ( id ).subscribe( (resp: Producto) => {

      this.producto = resp;

    });

       // this.producto = this._productoService.getproducto();
       // console.log();

  }


  cambiarFoto() {
  this._modalUploadService.mostrarModal( 'productos', this.producto._id );
  }

}
