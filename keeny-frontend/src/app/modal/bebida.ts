import { CategoriaBebida } from "./categoria-bebida";
import { TamanoBebida } from "./tamano-bebida";
import { TipoBebida } from "./tipo-bebida";

export interface Bebida {
    idBebida: string;
    descripcion: string;
    precio: number;
    stock: number;
    estado: number;
    categoria: CategoriaBebida;
    idCategoria: number;
    tipo: TipoBebida;
    idTipo: number;
    tamano: TamanoBebida;
    idTamano: number
}