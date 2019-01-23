import { Injectable } from '@angular/core';
import { UsuarioService } from '../usario/usuario.service';
import { CategoriaService } from '../categoria/categoria.service';
import { SubCategoria } from '../../models/subcategoria.model';


declare function init_plugins();

@Injectable()
export class SidebarService {

  menu: any = [];

  menuCat: any = {
    titulo: 'Categorias',
    icono: 'fas fa-list-ul',
    submenu: []
  };

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
    public _usuarioService: UsuarioService,
    public _catService: CategoriaService
  ) {
    }

    cargarMenu() {
      this.menu = this._usuarioService.menu;
    }

    cargarMenuCat() {

      this._catService.mostrarSubCat( 0, 999 ).subscribe( (subcategorias: any) => {
       // console.log( subcategorias );


        subcategorias = this.ordenar( subcategorias.subcategorias );

        let contador = 1;
        // tslint:disable-next-line:max-line-length
        this.menuCat.submenu[0] = { nombre: subcategorias[0].categoria.nombre, subcat: [{ nombre: subcategorias[0].nombre, id: '/verporcat/' + subcategorias[0]._id}] };

        for ( let i = 1; i < subcategorias.length; i++ ) {

            // tslint:disable-next-line:max-line-length
             if ( this.menuCat.submenu[contador - 1].nombre ===  subcategorias[i].categoria.nombre) {
              this.menuCat.submenu[contador - 1].subcat.push({nombre: subcategorias[i].nombre, id: '/verporcat/' + subcategorias[i]._id});
            } else {
              // tslint:disable-next-line:max-line-length
              this.menuCat.submenu[contador] = { nombre: subcategorias[i].categoria.nombre, subcat: [{ nombre: subcategorias[i].nombre, id: '/verporcat/' + subcategorias[i]._id}] };
              contador++;
          }

        }
        console.log('Cargando plugins');
        init_plugins();
       // console.log(  this.menuCat );
      });
    }



    ordenar( subcategorias: any ) {
      return subcategorias.sort((a, b) => {
        return a.categoria[ '_id' ] > b.categoria[ '_id' ];
    });
    }
}
