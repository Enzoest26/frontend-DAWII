import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUsuario } from 'src/app/modal/tipo-usuario';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  private url = BASE_URL + "/tipo-usuario/buscarTodos";
  constructor(private http : HttpClient) { }

  obtenerTiposUsuarios() : Observable<TipoUsuario[]>
  {
    return this.http.get<TipoUsuario[]>(`${this.url}`);
  }
}
