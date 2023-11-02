import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './component/mantenimiento/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './main/intranet/intranet.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';

const routes : Routes = [
  {path: '', redirectTo: 'intranet', pathMatch: 'full'},
  {path: 'intranet', component: IntranetComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'mantenimiento-usuario', component: UsuarioComponent},
    {path: 'mantenimiento-cliente', component: ClienteComponent}
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
