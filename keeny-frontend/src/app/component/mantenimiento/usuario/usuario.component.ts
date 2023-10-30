import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { TipoUsuario } from 'src/app/modal/tipo-usuario';
import { Usuario } from 'src/app/modal/usuario';
import { TipousuarioService } from 'src/app/service/mantenimiento/tipousuario/tipousuario.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
import { PATTERN_ALFABETICO, PATTERN_ALFABETICO_ESPACIO, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  public usuarios!: Usuario[];

  public tiposUsuarios !: TipoUsuario[];

  headerColumns: string[] = 
  ['idUsuario', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'edad', 'estado', 'tipoUsuario.descripcion', 'accion']

  formModal : any;

  usuarioForm !: FormGroup; 

  submited : Boolean = true;

  baseResponse ?: BaseResponse;

  dataUsuario: MatTableDataSource<Usuario>;

  tituloNotificacion ?: string;
  constructor(private usuarioService : UsuarioService, private tipoUsuarioService : TipousuarioService
    , private formBuilder : FormBuilder, private dialog : MatDialog
    , private snackBar : MatSnackBar){
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO_ESPACIO)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(100)]],
      estado: ['', Validators.required],
      tipoUsuario: ['', [Validators.required]]
    });
    
    this.dataUsuario = new MatTableDataSource<Usuario>([]);
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.dataUsuario = new MatTableDataSource(this.usuarios); // Inicializa dataUsuario aquí
    });
    this.tipoUsuarioService.obtenerTiposUsuarios().subscribe(data => this.tiposUsuarios = data);

  }

  onClickRegistrar(){
    this.limpiarFormulario();
    this.formModal.show();
  }

  onClickAbrirModal(){
    this.dialog.open(this.dialogContent, {width: '500px', height: '800px'});
    this.limpiarFormulario();
  }

  onSubmit(){
    if(this.usuarioForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let usuario = this.usuarioForm.value;
    usuario.idTipoUsuario = usuario.tipoUsuario;
    usuario.tipoUsuario = null;
    usuario.estado = Number(usuario.estado);
    this.usuarioService.registrarUsuario(usuario).subscribe({
      next: data => {
        console.log(data);
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataUsuario.data.push(data);
        this.dataUsuario._updateChangeSubscription();
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
    const usuario = this.usuarios.find(u => u.idUsuario === id);
    let usuarioMostrar;
    this.usuarioService.obtenerUsuariosPorId(usuario!.idUsuario.toString()).subscribe(data => {
      usuarioMostrar = data;
      console.log(usuarioMostrar.estado);
      if (usuarioMostrar) {
        this.usuarioForm.patchValue({
          nombre: usuarioMostrar.nombre,
          apellidoPaterno: usuarioMostrar.apellidoPaterno,
          apellidoMaterno: usuarioMostrar.apellidoMaterno,
          correo: usuarioMostrar.correo,
          edad: usuarioMostrar.edad,
          estado: usuarioMostrar.estado.toString(),
          tipoUsuario: usuarioMostrar.tipoUsuario.idTipoUsuario, 
        });
      }
      
      
    });
    
  }

  onClickEliminar(id : any)
  {

  }
  limpiarFormulario()
  {
    this.usuarioForm.reset();
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

