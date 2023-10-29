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
import { Select2Module } from 'ng-select2-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
    //NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
