import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import * as ServerResource from '../../providers/server-resource/server-resource';

const URL_USER = ServerResource.URL_SERVER + ServerResource.API_USER;

@Injectable()
export class UserApiService{
    
    //Constructor de nuestro servicio
    constructor(private _http: Http) {
    }

    //POST: Método que verifica la autenticación del usuario.
    public logUser(payload: any) {
        let head = new Headers({'Content-type':'application/json'});//Añadimos la cabecera a la petición.
        let _userV = JSON.stringify(payload); //Convertimos el objeto "User" en JSON.
        return this._http.post(URL_USER, _userV,{headers: head}).map(res => res.text())//Realizamos la petición POST, retornamos "Response" (Llamamos .text() para acceder el cuerpo de la respuesta).
    }
}