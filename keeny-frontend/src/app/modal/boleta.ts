import { ClienteComponent } from "../component/mantenimiento/cliente/cliente.component";
import { UsuarioComponent } from "../component/mantenimiento/usuario/usuario.component";

export interface venta {
    numBol: number;
    fechaBol: String;
    id_cliente : ClienteComponent;
    idUsuario : UsuarioComponent;
    totalBol: number;
}