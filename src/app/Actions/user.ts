import { Action } from '@ngrx/store';
import { User } from '../Data/Entity/user';

//Definimos nuestras acciones, su tipo es su nombre.
export const LOG_USER = 'LOG_USER';
export const LOG_USER_OK = 'LOG_USER_OK';
export const LOG_USER_ERROR = 'LOG_USER_ERROR';

/*Cada acción tiene su información que tiene 2 propiedades:
* Tipo: Es el tipo de la acción.
* Payload: Carga de información puede ser cualquier cosa.
*/

/*Ocupamos la interfaz Actions que solo forza a ocupar las dos propiedades.
*Configuramos cada Acción cons sus parametros y valores de retorno.
*/
export class logUser implements Action{
    readonly type = LOG_USER;
    constructor(public payload?: any){}
}

//Acción que se ejecuta si el proceso fue correcto.
export class logUserOk implements Action{
    //Definimos el payload a regresar.
    payload: User
    readonly type = LOG_USER_OK;
    constructor(_user: User){
        this.payload = _user;
    }
}

//Acción que se ejecuta si el usuario fue incorrecto.
export class logUserError implements Action{
    payload: {error: any}
    readonly type = LOG_USER_ERROR;
    constructor (error: any){
        this.payload = {error};
    }
}

/*Exportamos el tipo Acción que contiene todas las acciones del archivo.
*Esto es util para el checado de tipos en los reducers.
*/
export type Action = logUser | logUserOk | logUserError;
