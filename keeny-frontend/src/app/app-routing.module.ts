import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './component/mantenimiento/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './main/intranet/intranet.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';
import { NavbarComponent } from './main/navbar/navbar/navbar.component';
import { InicioPrincipalComponent } from './component/inicio-principal/inicio-principal.component';
import { LoginComponent } from './component/login/login.component';
import { ComidaComponent } from './component/mantenimiento/comida/comida.component';

const routes : Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: '', component: InicioPrincipalComponent},
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'intranet', component: IntranetComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'mantenimiento-usuario', component: UsuarioComponent},
    {path: 'mantenimiento-cliente', component: ClienteComponent},
    {path: 'mantenimiento-comida', component: ComidaComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
