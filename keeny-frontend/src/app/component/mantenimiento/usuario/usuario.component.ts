import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BaseResponse } from 'src/app/modal/base-response';
import { TipoUsuario } from 'src/app/modal/tipo-usuario';
import { Usuario } from 'src/app/modal/usuario';
import { TipousuarioService } from 'src/app/service/mantenimiento/tipousuario/tipousuario.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
import { BOTON_ACTUALIZAR, BOTON_REGISTRAR, PATTERN_ALFABETICO, PATTERN_ALFABETICO_ESPACIO, TITULO_ELIMINAR, TITULO_ERROR_NOTIFICACION, TITULO_EXITO_NOTIFICACION } from 'src/app/util/constantes';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>
  @ViewChild('notificacion') notificacion!: TemplateRef<any>
  @ViewChild('dialogEliminar') dialogEliminar!: TemplateRef<any>
  @ViewChild('matPaginator') paginator!: MatPaginator;
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

  contenidoDialogEliminar ?: any;

  tituloBoton? : string;

  tipoModal? : number; // 0 REGISTRAR, 1 ACTUALIZAR

  idUsuarioActualizar? :number;

  constructor(private usuarioService : UsuarioService, private tipoUsuarioService : TipousuarioService
    , private formBuilder : FormBuilder, private dialog : MatDialog
    , private snackBar : MatSnackBar){
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO_ESPACIO), Validators.maxLength(250)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO), Validators.maxLength(250)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO), Validators.maxLength(250)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      clave: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(100)]],
      estado: ['', Validators.required],
      tipoUsuario: ['', [Validators.required]]
    });
    
    this.dataUsuario = new MatTableDataSource<Usuario>([]);
    
  }

 

  ngAfterViewInit() {
    this.dataUsuario.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.dataUsuario = new MatTableDataSource(this.usuarios); // Inicializa dataUsuario aquí
      this.dataUsuario.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    });
    this.tipoUsuarioService.obtenerTiposUsuarios().subscribe(data => this.tiposUsuarios = data);

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

  registrarUsuario(){
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

  actualizarUsuario(){
    if(this.usuarioForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
    let usuario = this.usuarioForm.value;
    usuario.idUsuario = this.idUsuarioActualizar;
    usuario.idTipoUsuario = usuario.tipoUsuario;
    usuario.tipoUsuario = null;
    usuario.estado = Number(usuario.estado);
    const index = this.dataUsuario.data.findIndex(u => u.idUsuario === usuario.idUsuario);
    this.usuarioService.actualizarUsuario(usuario).subscribe({
      next: data => {
        this.mostrarNotificacionExito();
        this.dialog.closeAll();
        this.dataUsuario.data[index] = data;
        this.dataUsuario._updateChangeSubscription();
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
    const usuario = this.usuarios.find(u => u.idUsuario === id);
    let usuarioMostrar;
    this.usuarioService.obtenerUsuariosPorId(usuario!.idUsuario.toString()).subscribe(data => {
      usuarioMostrar = data;
      this.baseResponse = undefined;
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
      this.idUsuarioActualizar = usuarioMostrar.idUsuario;
    });
    this.tituloBoton = BOTON_ACTUALIZAR+ ' USUARIO';
    this.tipoModal = 1;
  }

  onClickEliminar(id : any)
  {
    this.contenidoDialogEliminar = {
      title: TITULO_ELIMINAR,
      content: "¿Desea eliminar el usuario de ID: " + id + "?",
      id: id
    };
    this.dialog.open(this.dialogEliminar);
  }

  cerrarDialogs(){
    this.dialog.closeAll();
  }

  accionEliminar(id : any)
  {
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: data => {
        this.baseResponse = data;
        const usuario = this.usuarios.find(u => u.idUsuario === id);
        let index = this.usuarios.findIndex(u => u.idUsuario === id);
        let usuarioMostrar;
        this.usuarioService.obtenerUsuariosPorId(usuario!.idUsuario.toString()).subscribe(data => {
          usuarioMostrar = data;
          this.dataUsuario.data.splice(index, 1);
          this.dataUsuario.data.push(usuarioMostrar);
          this.dataUsuario.data.sort((a, b) => a.idUsuario - b.idUsuario);
          this.dataUsuario._updateChangeSubscription();
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

