import { CarritoCompras } from "./carrito-compras";

export interface GenerarOrden {
    idUsuario: number;
    detalleCompra: CarritoCompras[];
}