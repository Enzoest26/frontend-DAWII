import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/modal/cliente';
import { BASE_URL } from 'src/app/util/constantes';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from 'src/app/modal/base-response';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlBuscarClientes = BASE_URL + "/intranet/cliente/buscarClientes";
  private urlRegistrarCliente = BASE_URL + "/intranet/cliente/registrar";
  private urlActualizarCliente = BASE_URL + "/intranet/cliente/actualizar";
  private urlEliminarCliente = BASE_URL + "/intranet/cliente/eliminar";
  private urlBuscarPorIdCliente = BASE_URL + "/intranet/cliente/buscarPorId";
  //publico
  private urlPublicoBuscarPorIdCliente = BASE_URL + "/publico/cliente/buscarPorEmail";
  constructor(private http : HttpClient) { }

  obtenerClientes() : Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(`${this.urlBuscarClientes}`);
  }

  registrarClientes(body : any) : Observable<any>
  {
    return this.http.post<any>(`${this.urlRegistrarCliente}`, body);
  }

  actualizarClientes(body : any) : Observable<any>
  {
    return this.http.put<any>(`${this.urlActualizarCliente}`, body);
  }

  eliminarCliente(id: string) : Observable<BaseResponse>
  {
    return this.http.delete<any>(`${this.urlEliminarCliente}/${id}`);
  }

  obtenerClientesPorId(id: string) : Observable<any>
  {
    return this.http.get<any>(`${this.urlBuscarPorIdCliente}/${id}`);
  }
  obtenerPublicoClientesPorEmail(email: string) : Observable<any>
  {
    return this.http.get<any>(`${this.urlPublicoBuscarPorIdCliente}?email=${email}`);
  }

}
