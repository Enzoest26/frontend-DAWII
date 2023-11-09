import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { Cliente } from 'src/app/modal/cliente';
import { ClienteService } from 'src/app/service/mantenimiento/cliente/cliente.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, PATTERN_ALFABETICO, PATTERN_ALFABETICO_ESPACIO, PATTERN_NUMERICO, TITULO_ELIMINAR, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, AfterViewInit{
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('matPaginator') paginator!: MatPaginator;

  public clientes!: Cliente[];

  headerColumns: string[] = 
  ['id_cliente', 'nombre_cliente', 'apellidos_cliente', 'dni_cliente', 'fec_nac_cliente', 'telefono_cliente', 'edad_cliente', 'emailCliente', 'estado_cliente', 'accion']

  formModal : any;

  clienteForm !: FormGroup;

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataCliente: MatTableDataSource<Cliente>;

  tituloNotificacion ?: string;

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  id_clienteActualizar? : number;

constructor(private clienteService: ClienteService, private formBuilder : FormBuilder, 
    private dialog : MatDialog, private snackBar : MatSnackBar) {
        this.clienteForm = this.formBuilder.group(
          {
            nombre_cliente: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            apellidos_cliente: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            dni_cliente: ['', [Validators.required, Validators.maxLength(8)]],
            fec_nac_cliente: ['', Validators.required],
            telefono_cliente: ['', [Validators.required, Validators.maxLength(9),Validators.pattern(PATTERN_NUMERICO)]],
            edad_cliente: ['', [Validators.required, Validators.max(100)]],
            emailCliente: ['', [Validators.required, Validators.email]],
            clave_cliente: ['', Validators.required],
            estado_cliente: ['', Validators.required]
          }
        );

    this.dataCliente = new MatTableDataSource<Cliente>([]);
}

ngAfterViewInit(): void {
  this.dataCliente.paginator = this.paginator;
}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((data) => {
      this.clientes = data;
      this.dataCliente = new MatTableDataSource(this.clientes);
      this.dataCliente.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    });
  }
  
  configurarTextoPaginacion(paginator: MatPaginator) {
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

  limpiarFormulario() {
    this.clienteForm.reset();
  }

  registrarCliente(){
    if(this.clienteForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let cliente = this.clienteForm.value;
    cliente.estado_cliente = Number(cliente.estado_cliente);
    this.clienteService.registrarClientes(cliente).subscribe({
      next: data => {
        console.log(data);
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataCliente.data.push(data);
        this.dataCliente._updateChangeSubscription();
        this.limpiarFormulario();
      },
      error: (error : HttpErrorResponse) =>{
        this.baseResponse = error.error;
        this.mostrarNotificacionError();
      }
    });
  }

  actualizarCliente(){
    if(this.clienteForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let cliente = this.clienteForm.value;
    cliente.id_cliente = this.id_clienteActualizar;
    cliente.estado_cliente = Number(cliente.estado_cliente);
    const index = this.dataCliente.data.findIndex(c => c.id_cliente === cliente.id_cliente);
    this.clienteService.actualizarClientes(cliente).subscribe({
      next: data => {
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataCliente.data[index] = data;
        this.dataCliente._updateChangeSubscription();
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

  onClickActualizar(id_cliente : any)
  {
    this.onClickAbrirModal();
    const cliente = this.clientes.find(c => c.id_cliente === id_cliente);
    let clienteMostrar;
    this.clienteService.obtenerClientesPorId(cliente!.id_cliente.toString()).subscribe(data => {
      clienteMostrar = data;
      console.log(clienteMostrar);
      if(clienteMostrar){
        this.clienteForm.patchValue({
          nombre_cliente: clienteMostrar.nombre_cliente,
          apellidos_cliente: clienteMostrar.apellidos_cliente,
          dni_cliente: clienteMostrar.dni_cliente,
          fec_nac_cliente: clienteMostrar.fec_nac_cliente,
          telefono_cliente: clienteMostrar.telefono_cliente.toString(),
          edad_cliente: clienteMostrar.edad_cliente.toString(),
          emailCliente: clienteMostrar.emailCliente,
          estado_cliente: clienteMostrar.estado_cliente.toString()
        });
      }
      this.id_clienteActualizar = clienteMostrar.id_cliente;
    });
    this.tituloBoton = BOTON_ACTUALIZAR+ ' CLIENTE';
    this.tipoModal = 1;
  }

  onClickEliminar(id : any)
  {
    this.contenidoDialogEliminar = {
      title: TITULO_ELIMINAR,
      content: "¿Desea eliminar al cliente de ID: " + id + "?",
      id: id
    };
    this.dialog.open(this.dialogEliminar);
  }

  cerrarDialogs(){
    this.dialog.closeAll();
  }

  accionEliminar(id : any)
  {
    this.clienteService.eliminarCliente(id).subscribe({
      next: data => {
        this.baseResponse = data;
        const cliente = this.clientes.find(c => c.id_cliente === id);
        let index = this.clientes.findIndex(c => c.id_cliente === id);
        let clienteMostrar;
        this.clienteService.obtenerClientesPorId(cliente!.id_cliente.toString()).subscribe(data => {
          clienteMostrar = data;
          this.dataCliente.data.splice(index, 1);
          this.dataCliente.data.push(clienteMostrar);
          this.dataCliente.data.sort((a, b) => a.id_cliente - b.id_cliente);
          this.dataCliente._updateChangeSubscription();
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

  mostrarNotificacionExito() {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
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



}
