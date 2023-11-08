import { Injectable } from '@angular/core';
import { TokenRol } from 'src/app/modal/token-rol';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoService {

  public autenticado : Boolean = false;

  public tokenRol?: TokenRol;
  constructor() { }

  isAutenticado()
  {
    return this.autenticado;
  }
}
