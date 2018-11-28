import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

const API_URL = 'http://localhost:39159/api/User';

@Injectable()
export class UserApiService{
    constructor(private _http: Http) {
    }

    public logUser(_usuario: User) {
        let _userV = JSON.stringify(_usuario);
        console.log(_userV)
        //Data.Message contiene los datos del usuario.
        return this._http.post(API_URL, _userV)
        .map(res => res.json())
        .map(data => data.messages)
    }
}