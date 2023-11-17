import { Injectable } from '@angular/core';
import { CarritoCompras } from 'src/app/modal/carrito-compras';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoCompras: CarritoCompras[] = [];

  constructor() {
    const carrito = localStorage.getItem("carrito");
    if(carrito){
      this.carritoCompras = JSON.parse(carrito);
    }
  }

  agregarProducto(id : string, cantidad: number, precio: number, descripcion: string) : Boolean
  {
    
    let producto = this.carritoCompras.find(p => p.idProducto === id);
    if(producto){
      return false;
    }
    let proAgregar : CarritoCompras = {
      idProducto: id,
      descripcion : descripcion,
      cantidad : cantidad,
      precio: precio
    } 
    console.log(proAgregar);
    this.carritoCompras.push(proAgregar);
    this.actualizarCarritoLocalStorage();
    return true;
  }

  eliminarProducto(id: string){
    let index = this.carritoCompras.findIndex(data => data.idProducto === id);
    this.carritoCompras.splice(index,1);
    this.actualizarCarritoLocalStorage();
  }

  obtenerTodoCarrito() : CarritoCompras[]{
    return this.carritoCompras;
  }


  actualizarCarritoLocalStorage(){
    console.log(this.carritoCompras);
    localStorage.setItem('carrito', JSON.stringify(this.carritoCompras));
  }

  limpiarLocalStorage(){
    this.carritoCompras = [];
    localStorage.removeItem('carrito');
  }

}
