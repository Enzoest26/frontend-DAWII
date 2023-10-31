import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './component/mantenimiento/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path: 'mantenimiento-usuarios', component: UsuarioComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
