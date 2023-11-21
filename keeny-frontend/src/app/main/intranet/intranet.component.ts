import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css']
})
export class IntranetComponent implements OnInit{
  events: string[] = [];
  opened: boolean = true;

  ngOnInit(): void {
    console.log("Estoy Aqui");
    this.obtenerNombreUsuario();
  }
  usuarioNombre = "Usuario";

  constructor(private sidebarService: SidebarService, private router: Router, private localStorageService : LocalStorageService, private usuarioService : UsuarioService )
  {
  }
  esconderSideBar()
  {
    this.opened = !this.opened;
    this.sidebarService.obtenerStatusSidebar(this.opened);
  }
  cerrarSesion()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    this.router.navigate(["login"]);
  }

  obtenerNombreUsuario(){
    const email = this.localStorageService.obtenerEmail();
    if(email){
      this.usuarioService.obtenerUsuarioPorEmail(email).subscribe(data =>{
        this.usuarioNombre = data.nombre;
      })
    }
  }

}
