import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';


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
            BreadcrumbsComponent
        ],
        exports: [
            SidebarComponent,
            NopagefoundComponent,
            HeaderComponent,
            BreadcrumbsComponent
        ]

})

export class SharedModule {}
