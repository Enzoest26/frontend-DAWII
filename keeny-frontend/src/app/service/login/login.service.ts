import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/modal/base-response';
import { Login } from 'src/app/modal/login';
import { BASE_URL } from 'src/app/util/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlLogin = BASE_URL + "/login";

  constructor(private http: HttpClient) { }

  login(login: Login) : Observable<BaseResponse>
  {
    return this.http.post<BaseResponse>(`${this.urlLogin}`, login)
  }
}
