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
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { IntranetComponent } from './main/intranet/intranet.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    IntranetComponent,
    InicioComponent,
    ClienteComponent
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
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatPaginatorModule
    //NoopAnimationsModule
  ],
  exports:[],
  providers: [MatSidenavModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
