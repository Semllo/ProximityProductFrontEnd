import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS;

    if ( !img ) {
      return url  + '/img/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      // console.log(img);
      return img;
    }  else if ( img.indexOf('uploads') >= 0) {
      img = img.replace( 'uploads' , 'img' );
      img = img.replace( '.' , '' );
    } else if ( img.indexOf('img') <= 0 ) {
      return url  + '/img/usuarios/xxx';
    }


    switch ( tipo ) {

      case 'usuario':
        url += img;
      break;

      case 'medico':
       url += img;
      break;

      case 'hospital':
       url += img;
      break;

      default:
      console.log('La imagen no existe, la url es incorrecta');
      url += '/img/usuarios/xxx';
    }

    return url;
  }

}
