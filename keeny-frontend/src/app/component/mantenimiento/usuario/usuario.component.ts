import { Component, OnInit } from '@angular/core';
import { FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Usuario } from 'src/app/modal/usuario';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';
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

  constructor(private usuarioService : UsuarioService, private formBuilder : FormBuilder){}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("modalUsuario")
    );


    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      edad: ['', Validators.required],
      estado: ['', Validators.required]
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

  }
}
