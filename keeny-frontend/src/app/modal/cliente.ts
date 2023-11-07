
export interface Cliente{
    id_cliente : number;
    
    nombre_cliente : string;
    apellidos_cliente : string;
    dni_cliente: string;

    fec_nac_cliente: string;
    telefono_cliente: string;
    edad_cliente: number;
    emailCliente: string;
    clave_cliente: string;
    estado_cliente: number;

    /*
    "id_cliente": null,
  "nombre_cliente": "Rosa",
  "apellidos_cliente": "Fernandez Loza",
  "dni_cliente": "81273000",
  "fec_nac_cliente": "2003-04-10",
  "telefono_cliente": "987654312",
  "edad_cliente": 22,
  "emailCliente": "rosa@mail.com",
  "clave_cliente": "",
  "estado_cliente": 1
    */
}