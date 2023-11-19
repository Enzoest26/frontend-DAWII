import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';
import { Bebida } from 'src/app/modal/bebida';
import { BaseResponse } from 'src/app/modal/base-response';
import { BebidaCatalogo } from 'src/app/modal/bebida-catologo';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {

  private urlListarTodos = BASE_URL + "/intranet/bebida/lista-general";
  private urlListarActivos = BASE_URL + "/intranet/bebida/estado-activo";
  private urlRegistrarBebida = BASE_URL + "/intranet/bebida/registrar";
  private urlActualizarBebida= BASE_URL + "/intranet/bebida/actualizar?idBebida";
  private urlEliminarBebida = BASE_URL + "/intranet/bebida/eliminar";
  private urlBuscarPorIdBebida = BASE_URL + "/intranet/bebida/buscarPorId";

  //publico
  private urlPublicoBuscarActivosPaginado = BASE_URL + "/publico/bebida/activos";
  private urlPublicoBuscarPorId = BASE_URL + "/publico/bebida";

  constructor(private http : HttpClient) { }

  obtenerBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.urlListarTodos}`);
  }

  obtenerBebidasActivo(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.urlListarActivos}`);
  }

  registrarBebida(body: any): Observable<any> {
    return this.http.post<any>(`${this.urlRegistrarBebida}`, body);
  }

  actualizarBebida(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.urlActualizarBebida}=${id}`, body);
  } 

  eliminarBebida(id: String): Observable<BaseResponse> {
    return this.http.delete<any>(`${this.urlEliminarBebida}/${id}`);
  }

  obtenerBebidasPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlBuscarPorIdBebida}/${id}`);
  }
  obtenerPublicoBebidasActivo(pagina: number): Observable<BebidaCatalogo> {
    return this.http.get<BebidaCatalogo>(`${this.urlPublicoBuscarActivosPaginado}?pagina=${pagina}`);
  }
  obtenerPublicoBebidasPorId(id: string): Observable<Bebida> {
    return this.http.get<Bebida>(`${this.urlPublicoBuscarPorId}/${id}`);
  }
}
