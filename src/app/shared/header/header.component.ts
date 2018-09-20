import { Component, OnInit } from '@angular/core';
import { UsuarioService, SidebarService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
                public _sidebar: SidebarService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    // console.log(this.usuario);
  }

}
