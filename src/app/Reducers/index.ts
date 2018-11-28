import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import * as fromUsersReducers from './user';

/*El estado global contiene el estado de toda la aplicación.
*La interfaz define toda la información necesaria para nuestra app.
*/
export interface State{
  users: fromUsersReducers.State  
}

//Separamos los reducers por secciones de la aplicación.
export const reducers: ActionReducerMap<State> = {
    users: fromUsersReducers.reducer
};


//Pintamos todas las acciones ocupando storeLogger
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return storeLogger()(reducer);
  }

/*Meta reducer nos permite agregar funcionalidad a cada reducer
* Ocupando el log para cada acción que ha sido manejada por reducers
*/
export const metaReducers: MetaReducer<State>[] = [logger];