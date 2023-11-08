import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'src/app/modal/base-response';
import { Comida } from 'src/app/modal/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private urlListarComidas = BASE_URL + "/intranet/comida/listar";
  private urlRegistrarComida = BASE_URL + "/intranet/comida/registrar";
  private urlActualizarComida = BASE_URL + "/intranet/comida/actualizar";
  private urlEliminarComida = BASE_URL + "/intranet/comida/eliminar";
  private urlBuscarPorIdComida = BASE_URL + "/intranet/comida/buscarPorId";

  constructor(private http : HttpClient) { }

  listarComidas() : Observable<Comida[]>
  {
    return this.http.get<Comida[]>(`${this.urlListarComidas}`);
  }

  obtenerComidaPorId(id: string) : Observable<any>
  {
    return this.http.get<any>(`${this.urlBuscarPorIdComida}/${id}`);
  }

  registrarComida(body : any) : Observable<any>
  {
    return this.http.post<any>(`${this.urlRegistrarComida}`, body);
  }

  actualizarComida(body : any) : Observable<any>
  {
    return this.http.put<any>(`${this.urlActualizarComida}`, body);
  }

  eliminarComida(id: string) : Observable<BaseResponse>
  {
    return this.http.delete<any>(`${this.urlEliminarComida}/${id}`);
  }

}
