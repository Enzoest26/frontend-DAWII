import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private localStorageService : LocalStorageService, private router: Router){}

  isAutenticado() : Boolean
  {
    return this.localStorageService.estaLogueado();
  }

  obtenerRol(): string{
    return this.localStorageService.obtenerRol();
  }

  esUser():boolean{
    if(this.obtenerRol() === 'USER')
      return true
    else
      return false
  }

  cerrarSesion(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    this.router.navigate(["login"]);
  }
}
