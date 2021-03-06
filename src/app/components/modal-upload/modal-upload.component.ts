import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivosService } from '../../services/subirArchivo/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';
import { ProductoService } from '../../services/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivosService,
    public _modalUploadService: ModalUploadService,
    public _productoService: ProductoService,
    public router: Router
  ) {
    // console.log('Modal listo');
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this._modalUploadService.limpiarModal();
      this.imagenTemp = null;
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('El archivo no es una imagen valida', 'Por favor, introduzca una imagen', 'error' );
      this._modalUploadService.limpiarModal();
      this.imagenSubir = null;
      return;
    }

    // console.log( archivo );
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    this._modalUploadService.ImagenCargando = true;
    console.log(this._modalUploadService.tipo);
    if ( this._modalUploadService.tipo === 'productos' ) {
      this._productoService.guardarProducto( this._modalUploadService.producto ).subscribe( (resp: any) => {


        // console.log(this.imagenSubir + ' ' +  this._modalUploadService.id + ' ' + this._modalUploadService.tipo);
         console.log(resp);
        // tslint:disable-next-line:max-line-length
        this._subirArchivoService.subirArchivo( this.imagenSubir,  this._modalUploadService.tipo , resp.producto._id).then( ( resp1: any ) => {

          this._modalUploadService.notificacion.emit( resp1 );
          this._modalUploadService.ImagenCargando = false;
          this.cerrarModal();

        }).catch( err => {
          console.log('Error al cargar');
          swal('Error al subir la imagen', 'Intentelo de nuevo', 'error');
          this._modalUploadService.ImagenCargando = false;
        });
        this._modalUploadService.limpiarModal();
        this.router.navigate(['/producto', resp.producto._id]);

       });
     } else {
      // tslint:disable-next-line:max-line-length
      this._subirArchivoService.subirArchivo( this.imagenSubir,  this._modalUploadService.tipo , this._modalUploadService.id).then( ( resp1: any ) => {

        this._modalUploadService.notificacion.emit( resp1 );
        this._modalUploadService.ImagenCargando = false;
        this.cerrarModal();

      }).catch( err => {
        console.log('Error al cargar');
        swal('Error al subir la imagen', 'Intentelo de nuevo', 'error');
      });
      this._modalUploadService.ImagenCargando = false;
      this._modalUploadService.limpiarModal();
     }


  }
}
