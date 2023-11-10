import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoBebida } from 'src/app/modal/tipo-bebida';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipobebidaService {

  private url = BASE_URL + "/intranet/bebida/tipos";

  constructor(private http : HttpClient) { }

  obtenerTipoBebidas(): Observable<TipoBebida[]> {
    return this.http.get<TipoBebida[]>(`${this.url}`);
  }
}
