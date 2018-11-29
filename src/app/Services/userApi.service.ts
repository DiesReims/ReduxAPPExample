import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { User } from "../Data/Entity/user";

const API_URL = 'http://localhost:39159/api/User';

@Injectable()
export class UserApiService{
    
    constructor(private _http: Http) {
    }

    public logUser(payload: any) {
        let head = new Headers({'Content-type':'application/json'});
        let _userV = JSON.stringify(payload);
        console.log(_userV)
        //Data.Message contiene los datos del usuario.
        return this._http.post(API_URL, _userV, {
            headers: head
        })
        .map(res => res.text())
    }
}