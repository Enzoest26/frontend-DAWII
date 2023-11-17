import { DtoComida } from "./dto-comida";

export interface ComidaCatalogo{
    totalPaginas: number;
    content: DtoComida[];
}