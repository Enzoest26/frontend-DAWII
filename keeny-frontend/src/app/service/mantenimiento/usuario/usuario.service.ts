import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modal/usuario';
import { BASE_URL } from 'src/app/util/constantes';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'src/app/modal/base-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBuscarTordos = BASE_URL + "/usuario/buscarTodos";
  private urlRegistrarUsuario = BASE_URL + "/usuario/registrar";
  private urlActualizarUsuario = BASE_URL + "/usuario/actualizar";
  private urlEliminarUsuario = BASE_URL + "/usuario/eliminar";
  private urlBuscarPorIdUsuario = BASE_URL + "/usuario/buscarPorId";
  constructor(private http : HttpClient) { }

  obtenerUsuarios() : Observable<Usuario[]>
  {
    return this.http.get<Usuario[]>(`${this.urlBuscarTordos}`);
  }

  obtenerUsuariosPorId(id: string) : Observable<any>
  {
    return this.http.get<any>(`${this.urlBuscarPorIdUsuario}/${id}`);
  }

  registrarUsuario(body : any) : Observable<any>
  {
    return this.http.post<any>(`${this.urlRegistrarUsuario}`, body);
  }

  actualizarUsuario(body : any) : Observable<any>
  {
    return this.http.put<any>(`${this.urlActualizarUsuario}`, body);
  }

  eliminarUsuario(id: string) : Observable<BaseResponse>
  {
    return this.http.delete<any>(`${this.urlEliminarUsuario}/${id}`);
  }
}

