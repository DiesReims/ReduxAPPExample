import { Injectable } from "@angular/core";
import { UserApiService } from "../Services";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { LOG_USER, logUserOk, logUserError, logUser } from "../Actions/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operator/map";

@Injectable()
export class UsersEffects{
    //Inyectamos los servicios requeridos.
    constructor(private actions$: Actions, private _userApiService: UserApiService){}

    /*La acción retornada es automaticamente despachada a el store cuando
    * por ngrx/effects.
    */
   @Effect()
   logUser$: Observable<Action> = this.actions$
   //Envia la solicitud cuando LOG_USER es despachado.
   .ofType(LOG_USER)
   //Envia la solicitud a la API.
   .switchMap((data: logUser)=>{
       return this._userApiService.logUser(data.payload)
       //Si la solicitud es satisfactoria llamamos  la logUserOk con el usuario retornado.
       .map(userData => new logUserOk(userData))
       //Algo fue mal con la solicitud.
       .catch(err => Observable.of(new logUserError(err)))
   })

}