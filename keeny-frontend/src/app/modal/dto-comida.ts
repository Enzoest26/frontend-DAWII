import { Postre } from "./Postre";
import { Sandwich } from "./sandwich";

export interface DtoComida{
    idComida: string;
    descComida: string;
    precioComida: string;
    stockComida: number;
    tipoComida: string;
    estadoComida: number;
    postre: Postre;
    sandwich: Sandwich;
}