import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivosService {

  constructor() { }


subirArchivo( archivo: File, tipo: string, id: string ) {

const formData = new FormData();
const xhr = new XMLHttpRequest();

console.log('Imagen:' + archivo);
    console.log('Tipo:' + tipo);
    console.log('id:' +  id);
// tslint:disable-next-line:no-shadowed-variable
return new Promise( (resolve, reject) => {

  formData.append( 'imagen', archivo, archivo.name );

  xhr.onreadystatechange = function() {

    if ( xhr.readyState === 4 ) {

      if ( xhr.status === 200 ) {
        console.log('Archivo subido');
        resolve( JSON.parse( xhr.response ));
      } else {
        console.log('Fallo subiendo el archivo');
        reject( JSON.parse( xhr.response ) );
      }

    }

  };

  const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

  xhr.open( 'PUT', url, true );
  xhr.send( formData );



});




}

}
