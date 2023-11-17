import { state, style, trigger,transition, animate } from '@angular/animations';
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
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})

export class VentaComponent implements OnInit{
  //FrmVenta: FormGroup;

  constructor(
    private srvReporte : VentaService,
    private srvImpresion: VentaService,
    private fb: FormBuilder
  ) {
   /* this.FrmVenta = this.fb.group({
      fecha: [''],
      productoId: ['']
    });*/
  }

  filtro : any = {
    fecha: '',
    productoId: ''
  };
  pagActual = 1;
  itemsPPag= 5;
  paginas =[2,5,10,20,50];
  filtroVisible: boolean = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNuevo() { }

  onFiltrar() {
   /* const estadoFiltro = this.stateFiltro === 'show' ? 'hice' : 'show';
    this.FrmVenta.reset(); // Limpiar el frm
    this.FrmVenta.get('fecha')?.setValue(''); // ?
    this.FrmVenta.get('productoId')?.setValue('');
    this.filtroVisible = estadoFiltro === 'show';*/
   // this.filtroVisible = !this.filtroVisible;
    this.Filtrar();
  }
  onImprimir() {
    const encabezado = ["N° Boleta", "Fecha", "Id Cliente", "Id Usuario", "Total"]
    const cuerpo = [
                    ["001", "17/11/2023", "1", "2","50"],
                    ["002", "15/10/2023", "2", "2","45.50"],
                    ["003", "02/10/2023", "3", "2","12.70"]
                  ]
    this.srvImpresion.imprimir(encabezado, cuerpo, "Reporte de Ventas", true)
  }
  onCerrar() {

  }

private Filtrar(): void {
  const fecha = this.filtro.fecha;
  const productoId = this.filtro.productoId;

  console.log('Filtrar por Fecha:', fecha);
  console.log('Filtrar por Producto ID:', productoId);
}

  onCambioPag(e:any){

  }
  onCambioTama(e:any){

  }

  get stateFiltro(){
    return this.filtroVisible ? 'show' : 'hide'
  }
}
