import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticadoService } from '../service/autenticado/autenticado.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private autenticacionService : AutenticadoService, private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("EStoy en el interceptor");
    
    if(request.url.includes("/intranet"))
    {
      console.log("Toy en la validacion");
      let token = localStorage.getItem("token");
      if(token)
      {
        console.log("Exite el token");
        console.log(token);
        request = request.clone({
          setHeaders: {Authorization : `Bearer ${token}`}
        });
      }
      
    }
    return next.handle(request);
  }
}
