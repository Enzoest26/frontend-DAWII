import { NgModule } from '@angular/core';
import { UsuarioComponent } from './component/mantenimiento/usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './main/intranet/intranet.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';
import { NavbarComponent } from './main/navbar/navbar/navbar.component';
import { InicioPrincipalComponent } from './component/inicio-principal/inicio-principal.component';
import { LoginComponent } from './component/login/login.component';
import { ComidaComponent } from './component/mantenimiento/comida/comida.component';
import { AuthGrard } from './config/auth-grard';
import { BebidaComponent } from './component/mantenimiento/bebida/bebida.component';
import { VentaComponent } from './component/reporte/venta/venta.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { VerComidaComponent } from './component/ver-comida/ver-comida.component';
import { CatalogoBebidaComponent } from './component/catalogo-bebida/catalogo-bebida.component';
import { VerBebidaComponent } from './component/ver-bebida/ver-bebida.component';

import { RegistroComponent } from './component/registro/registro.component';
import { CarritoComprasComponent } from './component/carrito-compras/carrito-compras.component';

const routes : Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: '', component: InicioPrincipalComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'catalogo-comidas', component: CatalogoComponent},
    {path: 'catalogo-bebida', component: CatalogoBebidaComponent},
    {path: 'ver-comida/:id', component: VerComidaComponent},
    {path: 'ver-bebida/:id', component: VerBebidaComponent},
    {path: 'carrito-compras', component: CarritoComprasComponent}
  ]},
  {path: 'intranet', component: IntranetComponent, canActivate: [AuthGrard] ,children: [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'mantenimiento-usuario', component: UsuarioComponent},
    {path: 'mantenimiento-cliente', component: ClienteComponent},
    {path: 'mantenimiento-comida', component: ComidaComponent},
    {path: 'mantenimiento-bebida', component: BebidaComponent},
    {path: 'reporte-venta', component: VentaComponent}
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
