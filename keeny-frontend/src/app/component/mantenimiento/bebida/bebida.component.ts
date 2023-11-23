import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { BaseResponse } from 'src/app/modal/base-response';
import { Bebida } from 'src/app/modal/bebida';
import { CategoriaBebida } from 'src/app/modal/categoria-bebida';
import { TamanoBebida } from 'src/app/modal/tamano-bebida';
import { TipoBebida } from 'src/app/modal/tipo-bebida';
import { BebidaService } from 'src/app/service/mantenimiento/bebida/bebida.service';
import { TipobebidaService } from 'src/app/service/mantenimiento/tipobebida/tipobebida.service';
import { TamanobebidaService } from 'src/app/service/mantenimiento/tamanobebida/tamanobebida.service';
import { CategoriabebidaService } from 'src/app/service/mantenimiento/categoriabebida/categoriabebida.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, PATTERN_ALFABETICO_ESPACIO, TITULO_ELIMINAR, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.component.html',
  styleUrls: ['./bebida.component.css']
})
export class BebidaComponent implements OnInit, AfterViewInit {
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('matPaginator') paginator!: MatPaginator;

  public bebidas!: Bebida[];
  public tipoBebidas!: TipoBebida[];
  public tamanoBebidas!: TamanoBebida[];
  public categoriaBebidas!: CategoriaBebida[];

  headerColumns: string[] = 
  ['idBebida', 'descripcionBebida', 'precioBebida', 'stockBebida', 'tipoBebida.descripcion', 'tamanioBebida.descripcion', 'categoriaBebida.descripcion', 'estadoBebida', 'accion']

  formModal : any;

  bebidaForm !: FormGroup;

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataBebida: MatTableDataSource<Bebida>;

  tituloNotificacion ?: string;

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  idBebidaActualizar? : number;

  constructor(private bebidaService: BebidaService, 
    private tipoBebidaService: TipobebidaService, 
    private tamanoBebidaService: TamanobebidaService, 
    private categoriaBebidaService: CategoriabebidaService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      this.bebidaForm = this.formBuilder.group({
        descripcion: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
        precio: ['', [Validators.required]],
        stock: ['', [Validators.required, Validators.min(0)]],
        tipo: ['', [Validators.required]],
        tamano: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      });
      
      this.dataBebida = new MatTableDataSource<Bebida>([]);
    }

    ngAfterViewInit(): void {
        this.dataBebida.paginator = this.paginator;
    }

    ngOnInit(): void {
      this.tipoBebidaService.obtenerTipoBebidas().subscribe(data =>this.tipoBebidas = data);
      this.categoriaBebidaService.obtenerCategoriaBebidas().subscribe(data =>this.categoriaBebidas = data);
      this.tamanoBebidaService.obtenerTamanoBebidas().subscribe(data => this.tamanoBebidas = data);
      console.log(this.tipoBebidas);
        this.bebidaService.obtenerBebidas().subscribe((data) => {
          this.bebidas = data;
          this.dataBebida = new MatTableDataSource(this.bebidas);
          this.dataBebida.paginator = this.paginator;
          this.configurarTextoPaginacion(this.paginator);
          
        });
        
    }

    configurarTextoPaginacion(paginator : MatPaginator) {
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

    onClickAbrirModal() {
      this.dialog.open(this.dialogContent, {width: '500px', height: '800px'});
      this.limpiarFormulario();
      this.tituloBoton = BOTON_REGISTRAR + ' BEBIDA';
      this.tipoModal = 0;
    }

    registrarBebida() {
      if(this.bebidaForm.invalid) {
        this.submited = false;
        return;
      }
      this.submited = true;
      let bebida = this.bebidaForm.value;
      bebida.descripcionBebida = bebida.descripcion;
      bebida.precioBebida = bebida.precio;
      bebida.stockBebida = bebida.stock;
      bebida.idTipoBebida = bebida.tipo;
      bebida.tipoBebida = null;
      bebida.idTamanioBebida = bebida.tamano;
      bebida.tamanoBebida = null;
      bebida.idCategoriaBebida = bebida.categoria;
      bebida.categoriaBebida = null;
      bebida.estado = Number(bebida.estado);
      const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
      const imagenFile = imageHtml.files?.[0];
      console.log(bebida);
      if(imagenFile){
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          bebida.imagen = base64String.split(',')[1]; 
          this.bebidaService.registrarBebida(bebida).subscribe({
            next: data => {
              let response : BaseResponse = {
                codRespuesta : "0",
                descripcion : "Registro Exitoso.",
                msjRespuesta : "Registro Exitoso."
              }
              this.baseResponse = response;
              this.mostrarNotificacionExito();
              this.dialog.closeAll();
              this.dataBebida.data.push(data);
              this.dataBebida._updateChangeSubscription();
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

    actualizarBebida() {
      if(this.bebidaForm.invalid) {
        this.submited = false;
        return;
      }
      this.submited = true;
      let bebida = this.bebidaForm.value;
      bebida.idBebida = this.idBebidaActualizar;
      bebida.descripcionBebida = bebida.descripcion;
      bebida.precioBebida = bebida.precio;
      bebida.stockBebida = bebida.stock;
      bebida.idTipoBebida = bebida.tipo;
      bebida.tipoBebida = null;
      bebida.idTamanioBebida = bebida.tamano;
      bebida.tamanoBebida = null;
      bebida.idCategoriaBebida = bebida.categoria;
      bebida.categoriaBebida = null;
      bebida.estadoBebida = Number(bebida.estado);
      const index = this.dataBebida.data.findIndex(b => b.idBebida === bebida.idBebida);
      const imageHtml = document.getElementById("imagenFile") as HTMLInputElement;
      const imagenFile = imageHtml.files?.[0];
      if(imagenFile){
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          bebida.imagen = base64String.split(',')[1]; 
          this.bebidaService.actualizarBebida(bebida!.idBebida.toString(), bebida).subscribe({
            next: data => {
              let response : BaseResponse = {
                codRespuesta : "0",
                descripcion : "Registro Exitoso.",
                msjRespuesta : "Registro Exitoso."
              }
              this.baseResponse = response;
              this.mostrarNotificacionExito();
              this.dialog.closeAll();
              this.dataBebida.data[index] = data;
              this.dataBebida._updateChangeSubscription();
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
        bebida.imagen = null;
        this.bebidaService.actualizarBebida(bebida!.idBebida.toString(), bebida).subscribe({
          next: data => {
            let response : BaseResponse = {
              codRespuesta : "0",
              descripcion : "Registro Exitoso.",
              msjRespuesta : "Registro Exitoso."
            }
            this.baseResponse = response;
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
            this.dataBebida.data[index] = data;
            this.dataBebida._updateChangeSubscription();
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

    
    onClickActualizar(id: any) {
      this.onClickAbrirModal();
      const bebida = this.bebidas.find(b => b.idBebida === id);
      let bebidaMostrar;
      console.log(bebida);
      this.bebidaService.obtenerBebidasPorId(bebida!.idBebida).subscribe(data => {
        bebidaMostrar = data;
        console.log(data);
        if (bebidaMostrar) {
          this.bebidaForm.patchValue({
            descripcion: bebidaMostrar.descripcionBebida,
            precio: bebidaMostrar.precioBebida,
            stock: bebidaMostrar.stockBebida,
            estado: bebidaMostrar.estadoBebida.toString(),
            tipo: bebidaMostrar.tipoBebida.id,
            tamano: bebidaMostrar.tamanioBebida.id,
            categoria: bebidaMostrar.categoriaBebida.id,
          });
        }
        this.idBebidaActualizar = bebidaMostrar.idBebida;
      });
      this.tituloBoton = BOTON_ACTUALIZAR+ ' BEBIDA';
      this.tipoModal = 1;
    }

    onClickEliminar(id : any) {
      this.contenidoDialogEliminar = {
        title: TITULO_ELIMINAR,
        content: "¿Desea eliminar la bebida de ID: " + id + "?",
        id: id
      };
      this.dialog.open(this.dialogEliminar)
    }

    cerrarDialogs(){
      this.dialog.closeAll();
    }

    accionEliminar(id : any) {
      this.bebidaService.eliminarBebida(id).subscribe({
        next: data => {
          this.baseResponse = data;
          const bebida = this.bebidas.find(b => b.idBebida === id);
          let index = this.bebidas.findIndex(b => b.idBebida === id);
          let bebidaMostrar;
          this.bebidaService.obtenerBebidasPorId(bebida!.idBebida.toString()).subscribe(data => {
            bebidaMostrar = data;
            this.dataBebida.data.splice(index, 1);
            this.dataBebida.data.push(bebidaMostrar);
            this.dataBebida.data.sort((a, b) => Number(a.idBebida.substring(0)) - Number(b.idBebida.substring(0)));
            this.dataBebida._updateChangeSubscription();
            this.mostrarNotificacionExito();
            this.dialog.closeAll();
          });
        },
        error: (error : HttpErrorResponse) => {
          this.baseResponse = error.error;
          this.mostrarNotificacionError();
        }
      });
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

    limpiarFormulario()
    {
      this.bebidaForm.reset();
    }
}
