import { Injectable } from "@angular/core";
import { UserApiService } from "../Services";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { LOG_USER, logUserOk, logUserError, logUser } from "../Actions/user";
import { Observable } from "rxjs";
import { WsUserContract } from "../Data/Entity/contracts/wsUserContract";

@Injectable()
export class UsersEffects{

    //Constructor de la clase UserEffects.
    constructor(private actions$: Actions, private _userApiService: UserApiService){} //Inyectamos los servicios requeridos (Actions de ngrxEffects & Nuestro servicio de usuarios).
   
    /*Definimos un Effect llamado "logUser$" con la ($) por que es de tipo Observable<Action> 
    Indica que cuando se llame un Action de tipo (LOG_USER), procesará la acción de llamar al provider de usuario y procesará la acción.
    Si todo es correcto retornará una acción de tipo LOG_USER_OK pasandole la información recibida (EL usuario retornado por el web service).
    Si ocurre un error mediante el catch con Observable.Of() enviaremos un observable con los valores indicados y finalmente una notificación de completado.
    Pasamos como parametro una acción de tipo LOG_USER_ERROR enviandole el error recibido. 
    por ngrx/effects.
    */
   @Effect()
   logUser$: Observable<Action> = this.actions$
   .ofType(LOG_USER) //Interceptamos una acción de tipo (LOG_USER)
   .switchMap((data: logUser)=>{
       //Llamamos el método de nuestro provider encargado de logear al usuario.
       return this._userApiService.logUser(data.payload)
       //Si la solicitud es satisfactoria llamamos  la logUserOk con el usuario retornado.
       .map(userData =>{
           if ((JSON.parse(userData).StatusCode === 0)){
            return new logUserOk((JSON.parse(userData).Entity))
           }
           else{
               return new logUserError('El acceso fue inválido');
           }
       })
       //Algo fue mal con la solicitud retornamos una acción con el error obtenido.
       .catch(err => Observable.of(new logUserError(err)))
   })

}