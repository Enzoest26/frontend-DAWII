import { TipoUsuario } from "./tipo-usuario";

export interface Usuario {
    idUsuario : number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    clave: string;
    edad: number;
    estado: number;
    tipoUsuario: TipoUsuario;
    idTipoUsuario: number;
}
