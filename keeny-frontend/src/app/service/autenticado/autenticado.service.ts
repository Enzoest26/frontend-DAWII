import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoService {

  public autenticado : Boolean = false;
  constructor() { }

  isAutenticado()
  {
    return this.autenticado;
  }
}
