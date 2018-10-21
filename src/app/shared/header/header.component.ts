import { Component, OnInit } from '@angular/core';
import { UsuarioService, SidebarService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
                public _sidebar: SidebarService,
              public router: Router ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    // console.log(this.usuario);
  }


  buscar( termino: string ) {

    this.router.navigate([ '/busqueda', termino ]);
  }


  esLogout ( submenu: any ) {

    console.log(submenu);
    if ( submenu.titulo === 'Cerrar sesión' ) {
          console.log('logout');
          this._usuarioService.logout();
    }

  }
}
