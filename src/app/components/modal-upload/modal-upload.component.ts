import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivosService } from '../../services/subirArchivo/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

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
    public _modalUploadService: ModalUploadService
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
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('El archivo no es una imagen valida', 'Por favor, introduzca una imagen', 'error' );
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

    // tslint:disable-next-line:max-line-length
    this._subirArchivoService.subirArchivo( this.imagenSubir,  this._modalUploadService.id , this._modalUploadService.tipo).then( resp => {

      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();

    }).catch( err => {console.log('Error al cargar'); });

  }
}
