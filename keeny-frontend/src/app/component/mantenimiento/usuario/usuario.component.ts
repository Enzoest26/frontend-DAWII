import { Component, OnInit } from '@angular/core';
import { FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Select2Data, Select2Option } from 'ng-select2-component';
import { TipoUsuario } from 'src/app/modal/tipo-usuario';
import { Usuario } from 'src/app/modal/usuario';
import { TipousuarioService } from 'src/app/service/mantenimiento/tipousuario/tipousuario.service';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
import { PATTERN_ALFABETICO } from 'src/app/util/constantes';
declare var window : any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuarios!: Usuario[];

  private gridApi! : GridApi;

  formModal : any;

  usuarioForm !: FormGroup; 

  submited : Boolean = true;

  select2Option : Select2Option[] = [];

  constructor(private usuarioService : UsuarioService, private tipoUsuarioService : TipousuarioService, private formBuilder : FormBuilder){
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern(PATTERN_ALFABETICO)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(PATTERN_ALFABETICO)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(100)]],
      estado: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("modalUsuario")
    );


    this.tipoUsuarioService.obtenerUsuarios().subscribe((data: TipoUsuario[]) => {
      this.select2Option = data.map((item: TipoUsuario) => ({
        value: item.idTipoUsuario.toString(),
        label: item.descripcion.toString(),
      }));
    });

    
  }
  /**
   * Creacion de las columnas que usamos 
   * el dato de tipo ColDef de Ag-Grid
   */

  public columnsDefs: ColDef[] = [
    {
      field : "idUsuario",
      headerName: "ID",
      filter: 'agTextColumnFilter',
      filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {
      field : "nombre", 
      headerName: "Nombre",
      filter: 'agTextColumnFilter',
        filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {
      field : "apellidoPaterno", 
      headerName: "Apellido Paterno",
      filter: 'agTextColumnFilter',
        filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {
      field : "apellidoMaterno",
      headerName: "Apellido Materno",
      filter: 'agTextColumnFilter',
        filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {
      field : "correo", 
      headerName: "Correo",
      filter: 'agTextColumnFilter',
        filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {
      field : "edad",
      headerName: "Edad",
      filter: 'agTextColumnFilter',
        filterParams: { 
        filterOptions: ['Contenido'],
        textCustomComparator: function (filter: any, value: any, filterText: string) {
          return value.toLowerCase().includes(filterText.toLowerCase());
        },
        filterPlaceholder: "Filtrar",
        textCustomFilterOptions: {
          filterText: '',
        }
      },
    },
    {field : "estado", headerName: "Estado"},
    {field : "tipoUsuario.descripcion", headerName: "Tipo Usuario"},
    {field : "", headerName: "Acción"}
  ];


  onGridReady(params: GridReadyEvent<Usuario>) {
    this.usuarioService.obtenerUsuarios().subscribe(data =>
      this.usuarios = data
    );
  }

  onClickRegistrar(){
    this.formModal.show();
  }

  onClickCerrar(){
    this.formModal.hide();
  }

  onSubmit(){
    if(this.usuarioForm.invalid)
    {
      this.submited = false;
      return;
    }
    this.submited = true;
  }
}
