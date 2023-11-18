import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bebida } from 'src/app/modal/bebida';
import { BebidaCatalogo } from 'src/app/modal/bebida-catologo';
import { BebidaService } from 'src/app/service/mantenimiento/bebida/bebida.service';

@Component({
  selector: 'app-catalogo-bebida',
  templateUrl: './catalogo-bebida.component.html',
  styleUrls: ['./catalogo-bebida.component.css']
})
export class CatalogoBebidaComponent implements OnInit{

  bebidaCatalogo! : BebidaCatalogo;
  paginaActual = 1;
  paginaFinal = 1;

  bebidasData : Bebida[] = [];
  constructor(private bebidaService : BebidaService, private router : Router){}
  
  
  ngOnInit(): void {
    this.bebidaService.obtenerPublicoBebidasActivo(this.paginaActual).subscribe(data =>{
      this.bebidaCatalogo = data;
      this.bebidasData = this.bebidaCatalogo.content;
      this.paginaFinal = this.bebidaCatalogo.totalPages;
    });
  }

  redireccionarPagina(idBebida: string){
    
  }

}
