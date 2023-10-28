import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './component/mantenimiento/usuario/usuario.component';
import { HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './main/sidebar/sidebar/sidebar.component';
import { FooterComponent } from './main/footer/footer/footer.component';
import { NavbarComponent } from './main/navbar/navbar/navbar.component'
import { AgGridModule } from 'ag-grid-angular';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
