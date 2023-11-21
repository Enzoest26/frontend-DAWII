import { TipoPostre } from "./tipo-postre";

export interface Comida {
    idComida: string;
    descComida: string;
    precioComida: number;
    stockComida: number;
    tipoComida: string;
    estadoComida: number;
    imagen: string;
    tipoPostre: TipoPostre;
    idTipoPostre: number
}