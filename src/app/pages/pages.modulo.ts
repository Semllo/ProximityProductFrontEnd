// General
import { NgModule } from '@angular/core';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { SharedModule } from '../shared/shared.modulo';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { PogressComponent } from './pogress/pogress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';



@NgModule({
        declarations: [
            PagesComponent,
            DashboardComponent,
            PogressComponent,
            Graficas1Component,
            IncrementadorComponent,
            GraficoDonaComponent,
            AccountSettingsComponent,
            PromesasComponent,
            ProfileComponent,
            UsuariosComponent,
            ModalUploadComponent
        ],
        exports: [
            DashboardComponent,
            PogressComponent,
            Graficas1Component

        ],
        imports: [
            CommonModule,
            SharedModule,
            PAGES_ROUTES,
            FormsModule,
            ChartsModule,
            PipesModule

          ]

})

export class PagesModule {}

