import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PogressComponent } from './pogress/pogress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { CriticasComponent } from './criticas/criticas.component';

import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ListasdeseosComponent } from './listasdeseos/listasdeseos.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosUserComponent } from './productos-user/productos-user/productos-user.component';

const pagesRoutes: Routes = [

    {
        path: '', component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }  },
            { path: 'progress', component: PogressComponent , data: { titulo: 'Progres' }  },
            { path: 'graficas1', component: Graficas1Component , data: { titulo: 'Graficas' }  },
            { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promesas' }  },
            { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes del tema' }  },
            { path: 'perfil', component: ProfileComponent , data: { titulo: 'Perfil de usuario' }  },
            { path: 'criticas', component: CriticasComponent , data: { titulo: 'Criticas de usuario' }  },
            { path: 'deseos', component: ListasdeseosComponent , data: { titulo: 'Mis listas de deseos' }  },
            { path: 'productoUser/:id', component: ProductosUserComponent , data: { titulo: 'Productos' }  },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent , data: { titulo: 'Mantenimiento de usuarios' }  },
            { path: 'productos', component: ProductosComponent , data: { titulo: 'Mantenimiento de productos' }  },
            { path: 'categorias', component: CategoriasComponent , data: { titulo: 'Mantenimiento de categorias' }  },
            { path: 'producto/:id', component: ProductoComponent , data: { titulo: 'Productos' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'  }
        ]

    }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
