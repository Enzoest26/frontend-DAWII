import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/modal/base-response';
import { GenerarOrden } from 'src/app/modal/generar-orden';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http : HttpClient) { }

  private urlVenta = BASE_URL + "/publico/boleta";

  realizarVenta(body: GenerarOrden) : Observable<BaseResponse>{
    return this.http.post<BaseResponse>(`${this.urlVenta}`,body);
  }
}
