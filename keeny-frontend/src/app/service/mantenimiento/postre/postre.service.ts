import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postre } from 'src/app/modal/Postre';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class PostreService {

  constructor(private http : HttpClient) { }

  private urlPostrePorId = BASE_URL + "/intranet/postre";

  obtenerPostrePorId(id : string){
    return this.http.get<Postre>(`${this.urlPostrePorId}/${id}`);
  }
}
