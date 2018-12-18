import { Permisos } from "./permisos";

export interface User {
    Id: number,
    StrUsuario: string,
    StrPassword: string,
    StrToken: string,
    permisos: Permisos[]
}