import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Retorna 
   */
  estaLogueado() : Boolean{
    const isAuth = localStorage.getItem("email");
    if(isAuth){
      return true;
    }
    return false;
  }

  obtenerEmail() : string{
    const email = localStorage.getItem("email");
    return email!;
  }

  obtenerRol() : string{
    const rol = localStorage.getItem("rol");
    return rol!;
  }
}
