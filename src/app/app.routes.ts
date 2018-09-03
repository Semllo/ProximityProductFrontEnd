import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './login/registre.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent  },
    { path: 'register', component: RegistreComponent  },
    { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
