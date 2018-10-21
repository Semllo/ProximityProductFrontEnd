import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/service.index';
import swal from 'sweetalert2';
import { SubCategoria } from '../../models/subcategoria.model';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  subcategorias: any;
  categorias: any;
  total: any;
  categoriaNombre: any = { nombre: '', _id: '' };
  categoriaNombre1: any;
  subcategoriaNombre: any;
  desde = 0;

  constructor( public _categoriaService: CategoriaService ) {

   }

  ngOnInit() {
    this.mostrarSubCategorias();
    this.mostrarCategorias();
  }


  mostrarSubCategorias () {

    // tslint:disable-next-line:max-line-length
    this._categoriaService.mostrarSubCat( this.desde ).subscribe( (resp: any  ) => {

      // console.log(resp);
      this.subcategorias = resp.subcategorias;

      for (let i = 0; i < this.subcategorias.length; i++  ) {

          if (this.subcategorias[i].categoria ===  null) {

           this.subcategorias[i].categoria = {_id: '', nombre: ''};

          }

      }


      this.total = resp.total;

      } , err => { console.log(err); });

  }

  mostrarCategorias () {

    // tslint:disable-next-line:max-line-length
    this._categoriaService.mostrarCat(  ).subscribe( (resp: any  ) => {

      // console.log(resp);
      this.categorias = resp.categorias;

      this.categorias.sort( (a, b) => {

        if ( a.nombre < b.nombre ) {
          return -1;
        } else if ( a.nombre > b.nombre ) {
          return 1;
        }
    return 0;

      });

      this.categoriaNombre = resp.categorias[0].nombre;

      } , err => { // console.log(err);
       });

  }

  crearSubcategoria( cat: any, categorias ) {

    // console.log(cat);
    // console.log(categorias);
    let id;

    for (let i = 0; i < this.categorias.length; i++  ) {

      if (this.categorias[i].nombre ===  cat.categoriaNombre) {

          id = this.categorias[i]._id;

      }

    }

    // console.log(id);
    // tslint:disable-next-line:max-line-length
    this._categoriaService.crearSubCat( id, cat.subcategoriaNom ).subscribe( (resp: any  ) => { console.log(resp); swal( 'Subcategoria creada', resp.subcategorias.nombre, 'success' ); this.mostrarSubCategorias(); }, err => { console.log(err); swal( 'Error', err.error.errors.errors.nombre.message, 'error' ); });

  }

  crearcategoria( nombre: any ) {

    // console.log(nombre);

     // tslint:disable-next-line:max-line-length
     this._categoriaService.crearCat( nombre.catNombre ).subscribe( (resp: any  ) => { console.log(resp); swal( 'Categoria creada', resp.categoria.nombre, 'success' ); this.mostrarCategorias(); this.mostrarSubCategorias(); } , err => { console.log(err); swal( 'Error', err.error.errors.errors.nombre.message, 'error' ); });

  }

  eliminarSubcategoria( id: any ) {

    // console.log(id);

    if (this.desde >= (this.total - 1) && this.total > 5) {
      this.desde = this.desde - 5;

        // this.cambiarDesde(this.desde);
    } else { this.mostrarSubCategorias(); }


    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: '¿Esta seguro que quiere eliminar la subcategoria?',
      text: 'La subcategoria: ' + id.nombre + ' será eliminada!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '<i class="fa fa-times"></i> No, cancelar!',
      confirmButtonText: '<i class="fa fa-check"></i> Si, deseo eliminar la subcategoria!',
      reverseButtons: true
    }).then((borrar) => {

      if (borrar.value) {

        this._categoriaService.eliminarSubCat( id._id ).subscribe( (resp: any  ) => {  console.log(resp);
          swalWithBootstrapButtons( 'Subcaegoria eliminada!', 'La subcategoria ha sido eliminada con exito', 'success' );
          this.mostrarSubCategorias();
       }, err => {
        swalWithBootstrapButtons('Error', 'La subcategoria no ha sido eliminado',  'error' );
        });

      } else if (
        // Read more about handling dismissals
        borrar.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons('Operación cancelada', 'La subctaegoria no ha sido eliminado', 'error');
      }
    });

  }

  eliminarcategoria( id: any ) {

    let idf = '';
    // console.log(id);
    // console.log(this.categorias);

    for ( let i = 0; i < this.categorias.length; i++ ) {
      if ( id.catNombre === this.categorias[i].nombre) {
        idf = this.categorias[i]._id;
      }
    }
    // console.log(idf);
    if ( idf !== '' ) {
      // tslint:disable-next-line:max-line-length
      this._categoriaService.eliminarCat( idf ).subscribe( (resp: any  ) => { console.log(resp); this.mostrarCategorias(); this.mostrarSubCategorias(); swal( 'Categoria eliminada', resp.categoria.nombre, 'success' ); });
    } else {
      swal( 'La categoria no existe', 'Introduzca una categoria valida', 'error' );
      return;
    }
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    // console.log( this.desde);
    if (desde >= this.total || desde < 0) {
      return;
    }

    this.desde += valor;
    this.mostrarSubCategorias();

    }


    actualizarSubcategoria( cat: any ) {

      let id;
       console.log(cat);


    for ( let i = 0; i < this.categorias.length; i++ ) {
      if ( cat.categoria.nombre === this.categorias[i].nombre) {
        id = this.categorias[i]._id;
      }
    }

      // console.log(id);
      // tslint:disable-next-line:max-line-length
       this._categoriaService.actualizarSubCat( cat.nombre, id, cat._id ).subscribe( (resp: any  ) => { console.log(resp);  this.mostrarSubCategorias(); swal( 'Subcategoria actualizada', resp.subcategorias.nombre, 'success' ); }, err => { console.log(err); swal( 'Error', err.error.errors.errors.nombre.message, 'error' ); });

    }
}
