import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Usuario } from 'src/app/modal/usuario';
import { UsuarioService } from 'src/app/service/mantenimiento/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuarios!: Usuario[];

  private gridApi! : GridApi;

  constructor(private usuarioService : UsuarioService){}

  ngOnInit(): void {
    
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
    {field : "edad", headerName: "Edad"},
    {field : "estado", headerName: "Estado"},
    {field : "tipoUsuario.descripcion", headerName: "Tipo Usuario"},
    {field : "", headerName: "Acción"}
  ];


  onGridReady(params: GridReadyEvent<Usuario>) {
    this.usuarioService.obtenerUsuarios().subscribe(data =>
      this.usuarios = data
    );
  }

}