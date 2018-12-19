import { User } from "../Data/Entity/user";
import * as fromuserActions from '../Actions/user';
import { WsUserContract } from "../Data/Entity/contracts/wsUserContract";

//Declaramos los datos que poseerá el Store (Sección de usuario)
export interface State {
    isLoading: boolean,
    isLogged: boolean,
    currentUser: User
}

//Declaramos una constante que será el estado incial de la aplicación (Sección Usuario).
export const initialState: State = {
    isLoading: false,
    isLogged: false,
    currentUser: null
}

//Creamos el reducer (función pura) con dos parámetros: Estado y Acción.
export function reducer(_state: State = initialState, _action: fromuserActions.Action) {
    //El reducer se compone de un switch que determina la acción y retorna siempre un nuevo estado.
    switch (_action.type) {

        case fromuserActions.LOG_USER: {
            /*Como estado arriba nosotros crearemos un nuevo estado.
            * Pondremos el usuario logeado en las propiedades.
            * Retornamos siempre un nuevo estado.
            */
            return {
                //El operador "..." + Variable retorna un nuevo objeto con los mismos valores del anterior.
                ..._state, //Retornamos un nuevo objeto, con los mismos valores. (Siempre debemos retornar un nuevo estado)
                isLoading: true //Modificamos el valor de "isLoading" indicando que esta cargando.
            }
        }

        case fromuserActions.LOG_USER_OK: {
            //Obtenemos el nuevo usuario del payload.
            //Entonces actualizamos el estado generando un nuevo estado con el usuario.
            const newUser = _action.payload;
            //Retornamos un nuevo objeto {Pro1:val1, Prop2: val2} (Siempre devuelve un nuevo valor)
            return {
                currentUser: newUser, //Asignamos el usuario obtenido desde el WebService.
                isLoading: false, //Modificamos "isLoading" (Indicando que ya no está cargando)
                isLogged: true //Modificamos "isLogged" (Indicando que se logeo de forma correcta)
            }
        }

        case fromuserActions.LOG_USER_ERROR: {
            //Obtenemos el error que devuelva el web service.
            return {
                ..._state, //Retornamos un nuevo objeto {Pro1:val1, Prop2: val2} (Siempre devuelve un nuevo valor)
                isLoading: false //Modificamos "isLoading" (Indicando que no se logró logear)
            }
        }

        case fromuserActions.LOG_USER_CLOSE: {
            return {
                currentUser: null,
                isLoading: false,
                isLogged: false
            }
        }

        default:
        //En caso de que no conozcamos la acción especificada devuelve el mismo estado.
            return _state;
    }
}