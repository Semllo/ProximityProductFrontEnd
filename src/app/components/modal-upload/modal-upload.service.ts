import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload service');
  }

  ocultarModal() {
      this.oculto = 'oculto';
      this.tipo = null;
      this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
      this.oculto = '';
      this.tipo = id;
      this.id = tipo;
  }

}
