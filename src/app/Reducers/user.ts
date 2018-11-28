import { User } from "../Data/Entity/user";
import * as fromuserActions from '../Actions/user';

//Creamos el store especifico de usuario con sus datos.
export interface State{
    isLoading: boolean,
    isLogged: boolean,
    currentUser: User
}

//Creamos el estado inicial del usuario.
export const initialState: State = {
    isLoading: false,
    isLogged: false,
    currentUser: null
}

//Creamos nuestro reducer que poseerá 2 params: Estado y Acción.
export function reducer(state: State = initialState, action: fromuserActions.Action){
    switch (action.type){

        case fromuserActions.LOG_USER:{
            /*Como estado arriba nosotros crearemos un nuevo estado.
            * Pondremos el usuario logeado en las propiedades.
            * Retornamos siempre un nuevo estado.
            */
            return {
                //...state: copia cada una de las propiedades de state en un nuevo objeto. 
                ...state,
                //La solicitud se esta procesando.
                isLoading: true
            }
        }

        case fromuserActions.LOG_USER_OK: {
            //Obtenemos el nuevo usuario del payload.
            //Entonces actualizamos el estado generando un nuevo estado con el usuario.
            const newUser = action.payload;
            //Retornamos siempre un nuevo estado.
            return{
                currentUser: newUser,
                //Petición realizada ya no hay más.
                isLoading: false,
                //Indicamos que se logeo correctamente.
                isLogged: true
            }
        }

        case fromuserActions.LOG_USER_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        
        default:
        return state;
    } 
}