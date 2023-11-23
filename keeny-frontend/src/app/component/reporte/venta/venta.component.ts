import { state, style, trigger,transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boleta } from 'src/app/modal/boleta';
import { FiltrosVenta } from 'src/app/modal/filtrosVenta';
import { VentaService } from 'src/app/service/reporte/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  animations: [
    trigger('estadoFiltro',[
      state('show', style({
        'max-height' : '100%', 'opacity' : '1', 'visibility' : 'visible'
      })),
      state('hide',style({
        'max-height' : '0', 'opacity' : '0', 'visibility' : 'hidden'
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})

export class VentaComponent implements OnInit{

  @ViewChild('idCliente') idClienteInput!: ElementRef;
  boletas: any[] = [];
  filtro : any;
  pagActual = 1;
  itemsPPag = 10;
  numRegs = 0;
  filtroVisible: boolean = false;
  venta: Boleta[] = [];

  fechaInicio!: string;
  fechaFinal!: string;

  filtroForm! : FormGroup;

  constructor(
    private ventaService: VentaService,
    private srvImpresion: VentaService,
    private datePipe: DatePipe,
    private formBuilder : FormBuilder
  ) { 

    this.filtroForm = formBuilder.group({
      fechaInicio : [''],
      fechaFin: [''],
      idCliente: ['']
    })

   }

  onCambioPag(e: any){ }

  onCambioTama(e: any){ }

  exportarExcel(){

    let idCliente = this.filtroForm.value.idCliente;
    let fechaIni = this.datePipe.transform(this.filtroForm.value.fechaInicio, 'yyyy-MM-dd')!;
    let fechaFin = this.datePipe.transform(this.filtroForm.value.fechaFin, 'yyyy-MM-dd')!;

    this.ventaService.exportarExcel(fechaIni, fechaFin, idCliente).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Reporte_Ventas.xlsx'; 
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
      }
    );
  }

  consultarPorFiltros(){
    this.boletas = [];
    let idCliente = this.filtroForm.value.idCliente;
    let fechaIni = this.datePipe.transform(this.filtroForm.value.fechaInicio, 'yyyy-MM-dd')!;
    let fechaFin = this.datePipe.transform(this.filtroForm.value.fechaFin, 'yyyy-MM-dd')!;

    this.ventaService.listarBoletasPorFiltros(fechaIni, fechaFin, idCliente).subscribe(data=>{
      
      this.boletas = data;
    });
  }

  limpiarFiltros(){
    this.filtroForm.reset();
  }
 
  // PDF
  onImprimir() {
    const encabezado = ["N° Boleta", "Fecha", "Id Cliente", "Total"]
    const cuerpo = [
                    ["001", "17/11/2023", "1", "2","50"],
                    ["002", "15/10/2023", "2", "2","45.50"],
                    ["003", "02/10/2023", "3", "2","12.70"]
                  ]
    this.srvImpresion.imprimir(encabezado, cuerpo, "Reporte de Ventas", true)
  /*  .subscribe(
      (data: any) => {
        const cuerpo = Object(data)['datos'].map(
          (obj : any) => {
            const datos = [
              obj.numBol,
              obj.fechaBol,
              obj.id_cliente,
              obj.totalBol
            ]
            return datos;
          }
        )
        this.srvImpresion.imprimir(encabezado, cuerpo, "Reporte de Ventas", true);
      }
    )*/
  }

  
  ngOnInit(): void {
    this.obtenerBoletas();
  }

  obtenerBoletas() {
    this.ventaService.listarBoletas().subscribe(
      (data) => {
        this.boletas = data;
      },
      (error) => {
        console.error('Error al obtener boletas', error);
      }
    );
  }
}
