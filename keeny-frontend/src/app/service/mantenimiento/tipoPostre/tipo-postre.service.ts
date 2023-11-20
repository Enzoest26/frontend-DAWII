import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPostre } from 'src/app/modal/tipo-postre';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipoPostreService {

  private url = BASE_URL + "/intranet/postre/tipos";

  constructor(private http: HttpClient) { }
  obtenerTiposPostres(): Observable<TipoPostre[]> {
    return this.http.get<TipoPostre[]>(`${this.url}`);
  }

}
