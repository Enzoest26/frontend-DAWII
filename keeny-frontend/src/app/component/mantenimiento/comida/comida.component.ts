import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { Comida } from 'src/app/modal/comida';
import { ComidaService } from 'src/app/service/mantenimiento/comida/comida.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, PATTERN_ALFABETICO_ESPACIO, PATTERN_NUMERICO, TITULO_ELIMINAR, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit, AfterViewInit {
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('matPaginator') paginator!: MatPaginator;

  public comidas!: Comida[];

  headerColumns: string[] = 
  ['idComida', 'descComida', 'precioComida', 'stockComida', 'tipoComida', 'estadoComida']

  formModal : any;

  comidaForm!: FormGroup;

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataComida: MatTableDataSource<Comida>;

  tituloNotificacion ?: string;

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  idComidaActualizar? : string;

  constructor(private comidaService : ComidaService, private formBuilder : FormBuilder, 
    private dialog : MatDialog, private snackBar : MatSnackBar){
    this.comidaForm = this.formBuilder.group({
      descComida: ['', [Validators.required, Validators.minLength(4), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
      precioComida: ['', Validators.required],
      stockComida: ['', [Validators.required, Validators.pattern(PATTERN_NUMERICO)]],
      tipoComida: ['', Validators.required],
      estado: ['', Validators.required]
    });
    
    this.dataComida = new MatTableDataSource<Comida>([]);
    
  }

  ngAfterViewInit() {
    this.dataComida.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.comidaService.listarComidas().subscribe((data) => {
      this.comidas = data;
      this.dataComida = new MatTableDataSource(this.comidas); // Inicializa dataUsuario aquí
      this.dataComida.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    });
  }

  configurarTextoPaginacion(paginator : MatPaginator){
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }

  onClickAbrirModal(){
    this.dialog.open(this.dialogContent, {width: '500px', height: '800px'});
    this.limpiarFormulario();
    this.tituloBoton = BOTON_REGISTRAR + ' USUARIO';
    this.tipoModal = 0;
  }

  registrarComida(){
    if(this.comidaForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let comida = this.comidaForm.value;
    comida.estadoComida = Number(comida.estadoComida);
    this.comidaService.registrarComida(comida).subscribe({
      next: data => {
        console.log(data);
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataComida.data.push(data);
        this.dataComida._updateChangeSubscription();
        this.limpiarFormulario();
      },
      error: (error : HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }
    });
    
  }

  actualizarComida(){
    if(this.comidaForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let comida = this.comidaForm.value;
    comida.idComida = this.idComidaActualizar;
    comida.estadoComida = Number(comida.estadoComida);
    const index = this.dataComida.data.findIndex(c => c.idComida === comida.idComida);
    this.comidaService.actualizarComida(comida).subscribe({
      next: data => {
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataComida.data[index] = data;
        this.dataComida._updateChangeSubscription();
        console.log(this.baseResponse);
        this.mostrarNotificacionExito();
        this.limpiarFormulario();
      },
      error: (error : HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }
    });
    
  }

  onClickActualizar(id : any)
  {
    this.onClickAbrirModal();
    const comida = this.comidas.find(c => c.idComida === id);
    let comidaMostrar;
    this.comidaService.obtenerComidaPorId(comida!.idComida).subscribe(data => {
      comidaMostrar = data;
      if (comidaMostrar) {
        this.comidaForm.patchValue({
          descComida: comidaMostrar.descComida,
          precioComida: comidaMostrar.precioComida.toString(),
          stockComida: comidaMostrar.stockComida.toString(),
          tipoComida: comidaMostrar.tipoComida,
          estadoComida: comidaMostrar.estadoComida.toString()
        });
      }
      this.idComidaActualizar = comidaMostrar.idComida;
    });
    this.tituloBoton = BOTON_ACTUALIZAR+ ' COMIDA';
    this.tipoModal = 1;
  }

  onClickEliminar(id : any)
  {
    this.contenidoDialogEliminar = {
      title: TITULO_ELIMINAR,
      content: "¿Desea eliminar la comida de ID: " + id + "?",
      id: id
    };
    this.dialog.open(this.dialogEliminar);
  }

  cerrarDialogs(){
    this.dialog.closeAll();
  }

  accionEliminar(id : any)
  {
    this.comidaService.eliminarComida(id).subscribe({
      next: data => {
        this.baseResponse = data;
        const comida = this.comidas.find(c => c.idComida === id);
        let index = this.comidas.findIndex(c => c.idComida === id);
        let comidaMostrar;
        this.comidaService.obtenerComidaPorId(comida!.idComida).subscribe(data => {
          comidaMostrar = data;
          this.dataComida.data.splice(index, 1);
          this.dataComida.data.push(comidaMostrar);
          this.dataComida._updateChangeSubscription();
          this.mostrarNotificacionExito();
          this.dialog.closeAll();
        });
      },
      error: (error : HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }

    });
  }
  limpiarFormulario()
  {
    this.comidaForm.reset();
  }

  mostrarNotificacionError()
  {
    this.tituloNotificacion = TITULO_ERROR_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  mostrarNotificacionExito()
  {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
