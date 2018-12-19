import { Action } from '@ngrx/store';
import { User } from '../Data/Entity/user';

//Definimos nuestras acciones, su tipo es su nombre.
export const LOG_USER = 'LOG_USER';
export const LOG_USER_OK = 'LOG_USER_OK';
export const LOG_USER_ERROR = 'LOG_USER_ERROR';
export const LOG_USER_CLOSE = 'LOG_USER_CLOSE';

/*Cada acción tiene su información que tiene 2 propiedades:
* Tipo: Es el tipo de la acción (Es un String).
* Payload: Carga de información puede ser cualquier cosa (Cualquier tipo).
*/

//Implementamos la interfaz "Actions" para forzar las dos propiedades.


//Acción que desencadena la llamada a web service de logeo.
export class logUser implements Action{
    readonly type = LOG_USER; //Tipo
    constructor(public payload: any){}//Recibe el payload (En este caso cualquier cosa).
}

//Acción que se ejecuta si el proceso fue correcto. (Web Service respondió)
export class logUserOk implements Action{  
    readonly type = LOG_USER_OK; //Tipo
    payload: User //Definimos el tipo de la propiedad payload a regresar.
    constructor(_user: any){
        this.payload = _user;
    }
}

//Acción que se ejecuta si el usuario fue incorrecto. (Web Service devolvió error)
export class logUserError implements Action{
    readonly type = LOG_USER_ERROR; //Tipo
    payload: {error: any} //Definimos el tipo de payload, un objeto con la propiedad error de cualquier tipo.
    constructor (error: any){
        this.payload = {error};
    }
}

export class logUserClose implements Action{
    readonly type = LOG_USER_CLOSE; //Tipo
    constructor (public payload: any){}
}

/*Exportamos el tipo "Action" que equivale y/o contiene todas las acciones del archivo.
*Esto es util para el checado de tipos en los reducers.
*/
export type Action = logUser | logUserOk | logUserError | logUserClose;
