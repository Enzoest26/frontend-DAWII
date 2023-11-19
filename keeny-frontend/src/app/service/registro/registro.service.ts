import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlRegistroCliente = BASE_URL + "/publico/cliente/registrar";
  constructor(private http : HttpClient) { }

  registroCliente(body : any) : Observable<any> 
  {
    return this.http.post<any>(`${this.urlRegistroCliente}`, body);
  }
  
}
