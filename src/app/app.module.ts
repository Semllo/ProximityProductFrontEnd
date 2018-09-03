// General
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './login/registre.component';
import { PagesModule } from './pages/pages.modulo';

// Servicios
import { ServiceModule } from './services/service.module';













@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistreComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

