import { Postre } from "./Postre";
import { Sandwich } from "./sandwich";

export interface DtoComida{
    idComida: string;
    descComida: string;
    precioComida: string;
    stockComida: number;
    tipoComida: string;
    estadoComida: number;
    imagen: string;
    postre: Postre;
    sandwich: Sandwich;
}