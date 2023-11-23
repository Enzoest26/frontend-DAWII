import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Boleta } from 'src/app/modal/boleta';
import { VentaService } from 'src/app/service/reporte/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})

export class VentaComponent implements OnInit{

  @ViewChild('idCliente') idClienteInput!: ElementRef;
  boletas: any[] = [];
  filtro : any;
  venta: Boleta[] = [];

  fechaInicio!: string;
  fechaFinal!: string;

  filtroForm! : FormGroup;

  constructor(
    private ventaService: VentaService,
    private datePipe: DatePipe,
    private formBuilder : FormBuilder
  ) { 

    this.filtroForm = formBuilder.group({
      fechaInicio : [''],
      fechaFin: [''],
      idCliente: ['']
    })

   }

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

  exportarPDF() {
    let idCliente = this.filtroForm.value.idCliente;
    let fechaIni = this.datePipe.transform(this.filtroForm.value.fechaInicio, 'yyyy-MM-dd')!;
    let fechaFin = this.datePipe.transform(this.filtroForm.value.fechaFin, 'yyyy-MM-dd')!;
    let nombreArchivo = 'Reporte_Ventas';
    
    this.ventaService.exportarPDF(fechaIni, fechaFin, idCliente, nombreArchivo);
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
