import { ClienteComponent } from "../component/mantenimiento/cliente/cliente.component";
import { UsuarioComponent } from "../component/mantenimiento/usuario/usuario.component";
import { Cliente } from "./cliente";
import { Usuario } from "./usuario";

export interface Boleta {
    numBol: number;
    fechaBol: String;
    id_cliente : Cliente;
    idUsuario : Usuario;
    totalBol: number;
}