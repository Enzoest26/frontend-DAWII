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
    console.log(email); 
    return email!;
  }
}
