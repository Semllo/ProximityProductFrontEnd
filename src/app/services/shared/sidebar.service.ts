import { Injectable } from '@angular/core';
import { UsuarioService } from '../usario/usuario.service';

@Injectable()
export class SidebarService {

  menu: any = [];
  menuUser: any = [{
      submenu: [
      { titulo: 'Perfil', url: '/perfil', icono: 'fas fa-user'  },
      { titulo: 'Recomendaciones', url: '/recomendaciones', icono: 'fas fa-heart'   },
      { titulo: 'Mis críticas', url: '/criticas', icono: 'fas fa-comments'   },
      { titulo: 'Mis deseos', url: '/deseos', icono: 'fas fa-list-ul' },
      { titulo: 'Estilos', url: '/account-settings', icono: 'ti-settings'   },
      { titulo: 'Cerrar sesión', url: '/login', icono: 'fa fa-power-off'   }
    ]
  }];

  /*menu: any = [
    /*{
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'  },
        { titulo: 'ProgressBar', url: '/progress'  },
        { titulo: 'Gráficas', url: '/graficas1'  },
        { titulo: 'Promesas', url: '/promesas'  }
      ]
},*//*
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios', icono: 'fas fa-users'  },
        { titulo: 'Productos', url: '/productos', icono: 'fas fa-boxes'  },
        { titulo: 'Categorias', url: '/categorias', icono: 'fas fa-tasks'  }
      ]
    }
  ];*/

  constructor(
    public _usuarioService: UsuarioService
  ) {
    }

    cargarMenu() {
      this.menu = this._usuarioService.menu;
    }
}
