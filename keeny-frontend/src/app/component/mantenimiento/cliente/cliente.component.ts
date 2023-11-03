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
  ['idCliente', 'nombre', 'apellidos', 'dni', 'fecnac', 'telefono', 'edad', 'email', 'estado', 'accion']

  formModal : any;

  clienteForm !: FormGroup;

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataCliente: MatTableDataSource<Cliente>;

  tituloNotificacion ?: string;

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  idClienteActualizar? : number;

constructor(private clienteService: ClienteService, private formBuilder : FormBuilder, 
    private dialog : MatDialog, private snackBar : MatSnackBar) {
        this.clienteForm = this.formBuilder.group(
          {
            nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            apellidos: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            dni: ['', Validators.required, Validators.maxLength(8)],
            fecnac: ['', Validators.required],
            telefono: ['', [Validators.required, Validators.maxLength(9),Validators.pattern(PATTERN_NUMERICO)]],
            edad: ['', [Validators.required, Validators.max(100)]],
            email: ['', [Validators.required, Validators.email]],
            clave: ['', Validators.required],
            estado: ['', Validators.required]
          }
        );

    this.dataCliente = new MatTableDataSource<Cliente>([]);
}

ngAfterViewInit(): void {
  this.dataCliente.paginator = this.paginator;
}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((data =>{
      this.clientes = data;
      this.dataCliente = new MatTableDataSource(this.clientes);
      this.dataCliente.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    }));
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
    if(this.clienteForm.invalid){
      this.submited = false;
      return;
    }
    this.submited = true;
    let cliente = this.clienteForm.value;
    cliente.estado = Number(cliente.estado);
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
    cliente.idCliente = this.idClienteActualizar;
    cliente.estado = Number(cliente.estado);
    const index = this.dataCliente.data.findIndex(c => c.idCliente === cliente.idCliente);
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

  onClickActualizar(id : any)
  {
    this.onClickAbrirModal();
    const cliente = this.clientes.find(c => c.idCliente === id);
    let clienteMostrar;
    // completar !!!!!!!!!!!
    this.clienteService.obtenerClientesPorId(cliente!.idCliente.toString()).subscribe(data => {
      clienteMostrar = data;
      if(clienteMostrar){
        this.clienteForm.patchValue({
          nombre: clienteMostrar.nombre,
          apellidos: clienteMostrar.apellidos,
          dni: clienteMostrar.dni,
          fecnac: clienteMostrar.fecnac,
          telefono: clienteMostrar.telefono,
          edad: clienteMostrar.edad.toString(),
          email: clienteMostrar.email,
          estado: clienteMostrar.estado.toString()
        });
      }
      this.idClienteActualizar = clienteMostrar.idCliente;
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
        const cliente = this.clientes.find(c => c.idCliente === id);
        let index = this.clientes.findIndex(c => c.idCliente === id);
        let clienteMostrar;
        this.clienteService.obtenerClientesPorId(cliente!.idCliente.toString()).subscribe(data => {
          clienteMostrar = data;
          this.dataCliente.data.splice(index, 1);
          this.dataCliente.data.push(clienteMostrar);
          this.dataCliente.data.sort((a, b) => a.idCliente - b.idCliente);
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
