import { Cliente } from "./cliente";

export interface Boleta {
    numBoleta: number;
    fechaBoleta: Date;
    idCliente : Cliente;
    totalMonto: number;
}