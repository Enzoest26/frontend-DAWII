import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComidaCatalogo } from 'src/app/modal/comida-catalogo';
import { DtoComida } from 'src/app/modal/dto-comida';
import { ComidaService } from 'src/app/service/mantenimiento/comida/comida.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{

  catalogoComidas! : ComidaCatalogo;
  dataDtoComidas : DtoComida[] = [];
  paginaActual = 1;
  paginaFinal = 1;
  constructor(private comidaService: ComidaService, private router: Router){
  }

  ngOnInit(): void {
    this.comidaService.listarComidasActivosPublico(this.paginaActual).subscribe(data =>
    {
      this.catalogoComidas = data;
      this.dataDtoComidas = this.catalogoComidas.content; 
      this.paginaFinal = this.catalogoComidas.totalPaginas
    });
  }

  redireccionarPagina(idComida: string){
    this.router.navigate(['ver-comida', idComida]);
  }


}
