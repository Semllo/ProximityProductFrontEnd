import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {
  constructor( public _usuariosService: UsuarioService,
  public router: Router ) {

  }

  canActivate(): boolean {

    if ( this._usuariosService.estaLogueado() ) {
        // console.log( 'PASO EL GUARD' );
        return true;
    } else {
      // console.log( 'Bloqueo GUARD' );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
