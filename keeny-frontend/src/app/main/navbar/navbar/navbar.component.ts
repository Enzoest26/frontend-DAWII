import { Component } from '@angular/core';
import { AutenticadoService } from 'src/app/service/autenticado/autenticado.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private autenticadoService : AutenticadoService){}

  isAutenticado() : Boolean
  {
    return this.autenticadoService.isAutenticado();
  }
}
