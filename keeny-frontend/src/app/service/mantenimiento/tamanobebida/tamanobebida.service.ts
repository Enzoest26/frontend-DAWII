import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TamanoBebida } from 'src/app/modal/tamano-bebida';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class TamanobebidaService {

  private url = BASE_URL + "/intranet/bebida/tamaños";

  constructor(private http : HttpClient) { }

  obtenerTamanoBebidas(): Observable<TamanoBebida[]> {
    return this.http.get<TamanoBebida[]>(`${this.url}`);
  }
}
