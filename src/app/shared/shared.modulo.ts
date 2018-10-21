import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
        imports: [
                RouterModule,
                CommonModule,
                PipesModule
        ],
        declarations: [
            NopagefoundComponent,
            SidebarComponent,
            HeaderComponent,
            BreadcrumbsComponent,
            ModalUploadComponent
        ],
        exports: [
            SidebarComponent,
            NopagefoundComponent,
            HeaderComponent,
            BreadcrumbsComponent,
            ModalUploadComponent
        ]

})

export class SharedModule {}
