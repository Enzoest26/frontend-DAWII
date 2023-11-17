import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comida } from 'src/app/modal/comida';
import { ComidaService } from 'src/app/service/mantenimiento/comida/comida.service';

@Component({
  selector: 'app-ver-comida',
  templateUrl: './ver-comida.component.html',
  styleUrls: ['./ver-comida.component.css']
})
export class VerComidaComponent implements OnInit{

  comida! : Comida;
  constructor(private activatedRouter : ActivatedRoute, private comidaService : ComidaService){
  }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    this.comidaService.obtenerComidaPublico(id!).subscribe(data => this.comida = data);
  }

}
