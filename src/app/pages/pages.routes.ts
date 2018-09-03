import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PogressComponent } from './pogress/pogress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';

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

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent , data: { titulo: 'Mentenimiento de usuarios' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'  }
        ]

    }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );