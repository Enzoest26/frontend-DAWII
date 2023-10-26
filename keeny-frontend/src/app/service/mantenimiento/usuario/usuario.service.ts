import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modal/usuario';
import { BASE_URL } from 'src/app/util/constantes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = BASE_URL + "/usuario/buscarTodos";
  constructor(private http : HttpClient) { }

  obtenerUsuarios() : Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>(`${this.url}`);
  }
}
