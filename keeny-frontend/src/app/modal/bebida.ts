import { CategoriaBebida } from "./categoria-bebida";
import { TamanoBebida } from "./tamano-bebida";
import { TipoBebida } from "./tipo-bebida";

export interface Bebida {
    idBebida: string;
    descripcionBebida: string;
    precioBebida: number;
    stock: number;
    estado: number;
    categoria: CategoriaBebida;
    idCategoria: number;
    tipoBebida: TipoBebida;
    idTipo: number;
    tamanioBebida: TamanoBebida;
    idTamano: number
}