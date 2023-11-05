import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadoService } from 'src/app/service/autenticado/autenticado.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;
  constructor(private loginSevice : LoginService, public autenticadoService : AutenticadoService, private formBuilder : FormBuilder, private router : Router)
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
        if(data.codRespuesta == '0') //Exito
        {
          this.autenticadoService.autenticado = true;
          this.router.navigate(["/"]);
        }
        else{
          console.log("Incorrecto");
        }
      }
    })
  }
}
