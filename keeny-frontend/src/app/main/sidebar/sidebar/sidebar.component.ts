import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public estatus : Boolean = true;

  constructor(public sidebarService : SidebarService)
  {
    this.estatus = this.sidebarService.opened;
  }

  estatusSidebar() {
    this.estatus = this.sidebarService.opened;
    return this.estatus;
  }

  
}
