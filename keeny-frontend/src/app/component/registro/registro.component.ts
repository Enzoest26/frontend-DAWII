import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Cliente } from 'src/app/modal/cliente';
import { RegistroService } from 'src/app/service/registro/registro.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PATTERN_ALFABETICO_ESPACIO, PATTERN_NUMERICO, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit{

  @ViewChild('notificacion') notificacion!: TemplateRef<any>

  tituloNotificacion ?: string;

  public clientes!: Cliente[];

  clienteForm !: FormGroup;

  submited : Boolean = true;

  dataCliente: MatTableDataSource<Cliente>;

  baseResponse ?: BaseResponse;


  constructor(private registroService : RegistroService, private formBuilder : FormBuilder, private dialog :  MatDialog, private snackBar:MatSnackBar){
    this.clienteForm = this.formBuilder.group({
      nombre_cliente: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            apellidos_cliente: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
            dni_cliente: ['', [Validators.required, Validators.maxLength(8)]],
            fec_nac_cliente: ['', Validators.required],
            telefono_cliente: ['', [Validators.required, Validators.maxLength(9),Validators.pattern(PATTERN_NUMERICO)]],
            edad_cliente: ['', [Validators.required, Validators.max(100)]],
            emailCliente: ['', [Validators.required, Validators.email]],
            clave_cliente: ['', Validators.required]
    });
    this.dataCliente = new MatTableDataSource<Cliente>([]);
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }

  registrarCliente(){
    if(this.clienteForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let cliente = this.clienteForm.value;

    this.registroService.registroCliente(cliente).subscribe({
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

  mostrarNotificacionError() {
    this.tituloNotificacion = TITULO_ERROR_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  mostrarNotificacionExito() {
    this.tituloNotificacion = TITULO_EXITO_NOTIFICACION;
    this.snackBar.openFromTemplate(this.notificacion, {
      duration: 10 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  limpiarFormulario() {
    this.clienteForm.reset();
  }

}
