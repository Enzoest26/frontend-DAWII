import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { Comida } from 'src/app/modal/comida';
import { TipoPostre } from 'src/app/modal/tipo-postre';
import { ComidaService } from 'src/app/service/mantenimiento/comida/comida.service';
import { PostreService } from 'src/app/service/mantenimiento/postre/postre.service';
import { TipoPostreService } from 'src/app/service/mantenimiento/tipoPostre/tipo-postre.service';
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
  @ViewChild('selectComida') selectComida !: MatSelect;

  public comidas!: Comida[];
  public tipoPostres!: TipoPostre[];

  headerColumns: string[] = 
  ['idComida', 'descComida', 'precioComida', 'stockComida', 'tipoComida', 'estadoComida', 'accion']

  formModal : any;

  comidaForm!: FormGroup;

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataComida: MatTableDataSource<Comida>;

  tituloNotificacion ?: string;

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  tipoComida? : number; // 0 SANDWICH, 1 POSTRE

  idComidaActualizar? : number;

  constructor(private comidaService : ComidaService, private tipoPostreService : TipoPostreService,
    private formBuilder : FormBuilder, private dialog : MatDialog, private snackBar : MatSnackBar, private postreService : PostreService){
    this.comidaForm = this.formBuilder.group({
      descComida: ['', [Validators.required, Validators.minLength(4), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
      precioComida: ['', [Validators.required, Validators.min(0)]],
      stockComida: ['', [Validators.required]],
      tipoComida: ['', [Validators.required]],
      estadoComida: ['', [Validators.required]],
      //tipoPostre: ['', [Validators.required]]
    });
    
    this.dataComida = new MatTableDataSource<Comida>([]);
    
  }

  ngAfterViewInit() {
    this.dataComida.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tipoPostreService.obtenerTiposPostres().subscribe(data =>this.tipoPostres = data);
    this.comidaService.listarComidas().subscribe((data) => {
      this.comidas = data;
      this.dataComida = new MatTableDataSource(this.comidas);
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
    this.dialog.open(this.dialogContent, {width: '500px', height: '700px'});
    this.limpiarFormulario();
    this.tituloBoton = BOTON_REGISTRAR + ' COMIDA';
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
    comida.idTipoPostre = comida.tipoPostre;
    comida.tipoPostre = null;
    comida.estadoComida = Number(comida.estadoComida);
    if(comida.tipoComida === "Postre"){
      comida.idTipoPostre = this.selectComida.value;
    }
    const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
    const imagenFile = imageHtml.files?.[0];
    if(imagenFile){
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        comida.imagen = base64String.split(',')[1]; 
        this.comidaService.registrarComida(comida).subscribe({
          next: data => {
            let response : BaseResponse = {
              codRespuesta : "0",
              descripcion : "Registro Exitoso.",
              msjRespuesta : "Registro Exitoso."
            }
            this.baseResponse = response;
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
      };

      reader.readAsDataURL(imagenFile);
    }else{
      let response : BaseResponse = {
        codRespuesta : "1",
        descripcion : "Ingrese una imagen correcta.",
        msjRespuesta : "Error"
      }
      this.baseResponse = response;
      this.mostrarNotificacionError()
    }

  }

  mostrarTipoComida(value: string){
    if(value === "Sandwich"){
      this.tipoComida = 0
    }else{
      this.tipoComida = 1
    }
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
    if(comida.tipoComida === "Postre"){
      comida.idTipoPostre = this.selectComida.value;
    }
    const index = this.dataComida.data.findIndex(c => c.idComida === comida.idComida);
    const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
    const imagenFile = imageHtml.files?.[0];
    if(imagenFile){
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        comida.imagen = base64String.split(',')[1]; 
        this.comidaService.actualizarComida(comida).subscribe({
          next: data => {
            let response : BaseResponse = {
              codRespuesta : "0",
              descripcion : "Registro Exitoso.",
              msjRespuesta : "Registro Exitoso."
            }
            this.baseResponse = response;
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
            this.dataComida.data[index] = data;
            this.dataComida._updateChangeSubscription();
            this.mostrarNotificacionExito();
            this.limpiarFormulario();
          },
          error: (error : HttpErrorResponse) =>{
            this.baseResponse = error.error;
            this.mostrarNotificacionError();
          }
        });
      };
      
      reader.readAsDataURL(imagenFile);
    }else{
      comida.imagen = null;
      this.comidaService.actualizarComida(comida).subscribe({
        next: data => {
          let response : BaseResponse = {
            codRespuesta : "0",
            descripcion : "Registro Exitoso.",
            msjRespuesta : "Registro Exitoso."
          }
          this.baseResponse = response;
          this.mostrarNotificacionExito();
          this.dialog.closeAll();
          this.dataComida.data[index] = data;
          this.dataComida._updateChangeSubscription();
          this.mostrarNotificacionExito();
          this.limpiarFormulario();
        },
        error: (error : HttpErrorResponse) =>{
          this.baseResponse = error.error;
          this.mostrarNotificacionError();
        }
      });
    }
    
  }

  onClickActualizar(id : any)
  {
    this.onClickAbrirModal();
    const comida = this.comidas.find(c => c.idComida === id);
    let comidaMostrar;
    
    this.comidaService.obtenerComidaPorId(comida!.idComida.toString()).subscribe(data => {
      comidaMostrar = data;
      if (comidaMostrar) {
        this.comidaForm.patchValue({
          descComida: comidaMostrar.descComida,
          precioComida: comidaMostrar.precioComida,
          stockComida: comidaMostrar.stockComida,
          tipoComida: comidaMostrar.tipoComida,
          estadoComida: comidaMostrar.estadoComida.toString()
        });
        if(comidaMostrar.tipoComida === 'Postre'){
          this.tipoComida = 1;
          this.postreService.obtenerPostrePorId(comida!.idComida).subscribe(data => {
            this.selectComida.value = data.tipoPostre.idTipo
          });
        }else{
          this.tipoComida = 0;
        }
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
        this.comidaService.obtenerComidaPorId(comida!.idComida.toString()).subscribe(data => {
          comidaMostrar = data;
          this.dataComida.data.splice(index, 1);
          this.dataComida.data.push(comidaMostrar);
          this.dataComida.data.sort((a, b) => Number(a.idComida.substring(0)) - Number(b.idComida.substring(0)));
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
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  mostrarNotificacionExito()
  {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
