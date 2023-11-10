import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaBebida } from 'src/app/modal/categoria-bebida';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class CategoriabebidaService {

  private url = BASE_URL + "/intranet/bebida/categorias";

  constructor(private http : HttpClient) { }

  obtenerCategoriaBebidas(): Observable<CategoriaBebida[]> {
    return this.http.get<CategoriaBebida[]>(`${this.url}`);
  }
}
