import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/modal/base-response';
import { AutenticadoService } from 'src/app/service/autenticado/autenticado.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  loginForm : FormGroup;

  response?: BaseResponse;
  constructor(private loginSevice : LoginService, public autenticadoService : AutenticadoService, private formBuilder : FormBuilder, private router : Router
    , private snackBar : MatSnackBar)
  {
    if(autenticadoService.isAutenticado())
    {
      this.router.navigate(["/intranet"]);
    }

    this.loginForm = this.formBuilder.group({
      idUsuario : ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  validarIngreso()
  {
    if(this.loginForm.invalid)
    {
      return;
    }

    let login = this.loginForm.value;
    this.loginSevice.login(login).subscribe({
      next : data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", login.idUsuario);
        this.router.navigate(["/intranet"]);
      },
      error : error =>{
        console.error(error);
        this.response = error.error;
        this.snackBar.openFromTemplate(this.notificacion, {
          duration: 3 * 1000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'fondo-notificacion-error'
        });
      }
    })
  }
}
