import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService ) {  }

  canActivate():  Promise<boolean> | boolean {
    console.log( 'Token guard' );

    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1] ) );

    const expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this._usuarioService.logout();
      return false;
    }

    console.log( payload );

    return this.verificaRenueva( payload.exp );
  }

  expirado ( fechaExp: number ) {

    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }


  verificaRenueva ( fechaExp: number ): Promise<boolean> {

    return new Promise ( (resolve, reject) => {

      const tokenExp = new Date( fechaExp * 1000 );
      // tslint:disable-next-line:prefer-const
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ));

      console.log( tokenExp );
      console.log( ahora );

      if ( tokenExp.getTime() > ahora.getTime() ) {

        resolve( true );

      } else {

        this._usuarioService.renuevaToken().subscribe( () => {
          resolve(true);
        }, () => {
          this._usuarioService.logout();
          reject(false);
        });

      }

      resolve( true );
    });

  }
}
