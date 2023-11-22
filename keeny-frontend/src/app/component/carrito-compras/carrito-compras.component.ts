import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarritoCompras } from 'src/app/modal/carrito-compras';
import { CarritoService } from 'src/app/service/carrito/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit, AfterViewInit{

  @ViewChild('matPaginator') paginator!: MatPaginator;

  headerColumns: string[] =
  ['idProducto', 'descripcion', 'cantidad', 'precio', 'accion'];

  dataCarrito: MatTableDataSource<CarritoCompras>;

  constructor(private carritoService : CarritoService){
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
    
  }

  ngAfterViewInit() {
    if(this.dataCarrito.data.length != 0){
      this.dataCarrito.paginator = this.paginator;
      this.configurarTextoPaginacion(this.paginator);
    }
   
  }

  eliminarProducto(idProducto : string){
    this.carritoService.eliminarProducto(idProducto);
  }

  calcularTotalPagar(){
    let totalPagar = 0;
    this.carritoService.obtenerTodoCarrito().forEach(s => totalPagar += (s.precio * s.cantidad));
    return totalPagar.toFixed(2);
  }

}
