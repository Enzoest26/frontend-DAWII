import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, filter, map, tap } from 'rxjs';
import { AutenticadoService } from '../service/autenticado/autenticado.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private autenticacionService : AutenticadoService, private router : Router, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {  
    if(request.url.includes("/intranet"))
    {
      let token = localStorage.getItem("token");
      if(token){
        request = request.clone({
          setHeaders: {Authorization : `Bearer ${token}`}
        });
      }
    }
    return next.handle(request).pipe(tap({
      next: (event) =>{

      },
      error: (error) => {
        if(error.status === 403){
          this.snackBar.open("Token Expirado, ingrese nuevamente", "", {
            duration: 1000 * 6,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['login']);
        }else if(error.status === 500){
          this.snackBar.open("Ocurrio error interno con el servidor.", "", {
            duration: 1000 * 6,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }else if(error.status === 0){
          this.snackBar.open("No hubo comunicación con el servidor. Contacte con su administrador.", "", {
            duration: 1000 * 6,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
    }));
  }


}
