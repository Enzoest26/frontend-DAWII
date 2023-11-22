import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{


  ngOnInit(): void {
    console.log("Estoy Aqui");
    this.obtenerNombreUsuario();
  }

  usuarioNombre = "Usuario";

  constructor(private router: Router, private usuarioService : UsuarioService, private localStorageService : LocalStorageService){}

  obtenerNombreUsuario() {
    const email = this.localStorageService.obtenerEmail();
    if(email){
      this.usuarioService.obtenerUsuarioPorEmail(email).subscribe(data =>{
        this.usuarioNombre = data.apellidoPaterno;
      })
    }
  }

  
  
}
