import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validator } from '@angular/forms';
import { VentaService } from 'src/app/service/reporte/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  animations: [
    trigger('estadoFiltro',[
      state('show', style({
        'max-height' : '100%', 'opacity' : '1', 'visibilite' : 'visible'
      })),
      state('hide',style({
        'max-height' : '0', 'opacity' : '0', 'visibilite' : 'hidden'
      }))
    ])
  ]
})
export class VentaComponent implements OnInit{



  constructor(
    private srvReporte : VentaService
  ) {}

  filtro : any;
 // FrmVenta: FormGroup;
  pagActual = 1;
  itemsPPag= 5;
  paginas =[2,5,10,20,50];
  filtroVisible: boolean = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNuevo() { }

  onFiltrar() {
    this.filtroVisible = !this.filtroVisible;
  }
  onImprimir() {

  }
  onCerrar() {

  }

  onCambioPag(e:any){

  }
  onCambioTama(e:any){

  }

  get stateFiltro(){
    return this.filtroVisible ? 'show' : 'hide'
  }
}
