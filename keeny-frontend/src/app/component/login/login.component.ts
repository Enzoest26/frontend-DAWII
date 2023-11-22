import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/modal/base-response';
import { AutenticadoService } from 'src/app/service/autenticado/autenticado.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  loginForm : FormGroup;

  response?: BaseResponse;

  formValid : Boolean = true;
  constructor(private loginSevice : LoginService, private formBuilder : FormBuilder, private router : Router
    , private snackBar : MatSnackBar, private localStorageService : LocalStorageService)
  {
    

    this.loginForm = this.formBuilder.group({
      idUsuario : ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    console.log(this.localStorageService.estaLogueado());
    if(this.localStorageService.estaLogueado()){
      if(this.localStorageService.obtenerRol() === 'USER'){
        this.router.navigate(["/"]);
      }else{
        this.router.navigate(["/intranet"]);
      }
    }
  }

  validarIngreso()
  {
    if(this.loginForm.invalid){
      this.formValid = false;
      return;
    }
    this.formValid = true;
    let login = this.loginForm.value;
    this.loginSevice.login(login).subscribe({
      next : data => {
        if(data.rol === 'USER'){
          console.log("Es Usuario");
          localStorage.setItem("email", login.idUsuario);
          localStorage.setItem("rol", data.rol);
          this.router.navigate(["/"]);
        }else{
          localStorage.setItem("email", login.idUsuario);
          localStorage.setItem("token", data.token);
          localStorage.setItem("rol", data.rol);
          this.router.navigate(["/intranet"]);
        }
      },
      error : error =>{
        console.error(error);
        this.response = error.error;
        this.snackBar.openFromTemplate(this.notificacion, {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'fondo-notificacion-error'
        });
      }
    })
  }
}
