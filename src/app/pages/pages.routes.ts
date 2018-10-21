import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PogressComponent } from './pogress/pogress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { CriticasComponent } from './criticas/criticas.component';

import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListasdeseosComponent } from './listasdeseos/listasdeseos.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosUserComponent } from './productos-user/productos-user/productos-user.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones/recomendaciones.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [ VerificaTokenGuard ]  },
            { path: 'progress', component: PogressComponent , data: { titulo: 'Progres' }  },
            { path: 'graficas1', component: Graficas1Component , data: { titulo: 'Graficas' }  },
            { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promesas' }  },
            { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes del tema' }  },
            { path: 'perfil', component: ProfileComponent , data: { titulo: 'Perfil de usuario' }  },
            { path: 'criticas', component: CriticasComponent , data: { titulo: 'Criticas de usuario' }  },
            { path: 'deseos', component: ListasdeseosComponent , data: { titulo: 'Mis listas de deseos' }  },
            { path: 'productoUser/:id', component: ProductosUserComponent , data: { titulo: 'Productos' }  },
            { path: 'recomendaciones', component: RecomendacionesComponent , data: { titulo: 'Recomendaciones' }  },
            { path: 'busqueda/:termino', component: BusquedaComponent , data: { titulo: 'Buscador' }  },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de usuarios' }  },
            // tslint:disable-next-line:max-line-length
            { path: 'productos', component: ProductosComponent , canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de productos' }  },
            // tslint:disable-next-line:max-line-length
            { path: 'categorias', component: CategoriasComponent , canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de categorias' }  },
            { path: 'producto/:id', component: ProductoComponent , canActivate: [AdminGuard], data: { titulo: 'Productos' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'  }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
