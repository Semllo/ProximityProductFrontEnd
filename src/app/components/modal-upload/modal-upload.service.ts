import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public producto: any;
  public ImagenCargando = false;

  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    // console.log('Modal upload service');
  }

  ocultarModal() {
      this.oculto = 'oculto';
      this.tipo = null;
      this.id = null;
      this.producto = null;
      this.ImagenCargando = false;
  }

  mostrarModal( tipo: string, id: string, producto?: any ) {
    if (producto) {
      this.producto = producto;
    }
      this.oculto = '';
      this.tipo = tipo;
      this.id = id;
  }

  limpiarModal() {
    this.tipo = null;
      this.id = null;
      this.producto = null;
      this.ImagenCargando = false;
  }
}
