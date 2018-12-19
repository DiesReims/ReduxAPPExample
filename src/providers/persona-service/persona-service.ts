import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iService } from '../../app/Data/Interfaces/iService';
import { WsPersonaContract } from '../../app/Data/Entity/contracts/wsPersonaContract';
import * as ServerResource from '../server-resource/server-resource';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL_PERSONA = ServerResource.URL_SERVER + ServerResource.API_PERSONA;

@Injectable()
export class PersonaServiceProvider implements iService<WsPersonaContract>{

  contractReceived: Observable<WsPersonaContract>;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<WsPersonaContract> {
    return this.http.get(URL_PERSONA, { headers: {'Content-Type': 'application/json', 'tokenSesion': '12345' }}).map(data => data as WsPersonaContract);
  }

  getById(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    return this.http.get(URL_PERSONA + _Data.Entity.Id, { headers: { 'Content-Type': 'application/json', 'tokenSesion': '12345' }})
    .map(data => data as WsPersonaContract);
  }
  postEntity(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    return this.http.post(URL_PERSONA,_Data,{ headers: { 'Content-Type': 'application/json', 'tokenSesion': '12345' }})
    .map(data => data as WsPersonaContract);
  }
  PutEntity(_Id: number, _Data: WsPersonaContract): Observable<WsPersonaContract> {
    return this.http.put(URL_PERSONA + _Id, _Data,{ headers: {'Content-Type': 'application/json', 'tokenSesion': '12345' }})
    .map(data => data as WsPersonaContract);
  }
  deleteEntity(_Data: number): Observable<WsPersonaContract> {
    return this.http.delete(URL_PERSONA + _Data, { headers: {'Content-Type': 'application/json', 'tokenSesion': '12345' }})
    .map(data => data as WsPersonaContract);
  }


}
