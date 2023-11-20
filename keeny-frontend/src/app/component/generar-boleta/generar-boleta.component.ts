import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseResponse } from 'src/app/modal/base-response';
import { CarritoCompras } from 'src/app/modal/carrito-compras';
import { Cliente } from 'src/app/modal/cliente';
import { GenerarOrden } from 'src/app/modal/generar-orden';
import { CarritoService } from 'src/app/service/carrito/carrito.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { ClienteService } from 'src/app/service/mantenimiento/cliente/cliente.service';
import { OrdenService } from 'src/app/service/orden/orden.service';

@Component({
  selector: 'app-generar-boleta',
  templateUrl: './generar-boleta.component.html',
  styleUrls: ['./generar-boleta.component.css']
})
export class GenerarBoletaComponent implements OnInit, AfterViewInit{

  @ViewChild('notificacionExito') notificacionExito!: TemplateRef<any>
  @ViewChild('notificacionError') notificacionError!: TemplateRef<any>

  @ViewChild('matPaginator') paginator!: MatPaginator;

  headerColumns: string[] =
  ['idProducto', 'descripcion', 'cantidad', 'precio'];

  dataCarrito: MatTableDataSource<CarritoCompras>;

  dataCliente!: Cliente;

  isAuth : Boolean = false;

  baseResponse! : BaseResponse;

  constructor(private carritoService : CarritoService, private localStorageService : LocalStorageService,
    private snackBar: MatSnackBar, private clienteService : ClienteService, private ordenService : OrdenService,
    private router : Router){
    this.dataCarrito = new MatTableDataSource<CarritoCompras>([]);
    
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


  ngOnInit(): void {
    this.dataCarrito = new MatTableDataSource(this.carritoService.obtenerTodoCarrito());
    if(this.localStorageService.estaLogueado()){
      this.isAuth = true;
      this.clienteService.obtenerPublicoClientesPorEmail(this.localStorageService.obtenerEmail()).subscribe(data => this.dataCliente = data);
    }
  }

  ngAfterViewInit() {
    if(this.dataCarrito.data.length != 0){
      this.dataCarrito.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    }
   
  }


  generarOrden(){
    if(this.carritoService.obtenerTodoCarrito().length === 0)
    {
      let response : BaseResponse = {
        codRespuesta : "1",
        descripcion : "No existen producto en el carrito para realizar la compra.",
        msjRespuesta : "Error"
      }
      this.baseResponse = response;
      this.snackBar.openFromTemplate(this.notificacionError, {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    let ordenCompra : GenerarOrden = {
      idUsuario : this.dataCliente.id_cliente,
      detalleCompra : this.carritoService.obtenerTodoCarrito()
    }
    this.ordenService.realizarVenta(ordenCompra).subscribe({
      next : data =>{
        this.baseResponse = data;
        this.snackBar.openFromTemplate(this.notificacionExito, {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.carritoService.limpiarLocalStorage();
        //this.router.navigate(["/"]);
      }, error : error =>{
        this.baseResponse = error.error;
        this.snackBar.openFromTemplate(this.notificacionError, {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    })
  }

  calcularTotalPagar(){
    let totalPagar = 0;
    this.carritoService.obtenerTodoCarrito().forEach(s => totalPagar += (s.precio * s.cantidad));
    return totalPagar;
  }



}
