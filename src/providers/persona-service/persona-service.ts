import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iService } from '../../app/Data/Interfaces/iService';
import { WsPersonaContract } from '../../app/Data/Entity/contracts/wsPersonaContract';
import { URL_SERVER } from '../server-resource/server-resource';
import { Observable } from 'rxjs';

@Injectable()
export class PersonaServiceProvider implements iService<WsPersonaContract>{

  contractReceived: Observable<WsPersonaContract>;

  constructor(public http: HttpClient) {
  }

  getAll(): Observable<WsPersonaContract> {
    return this.http.get(URL_SERVER + 'persona/', { headers: { 'Content-Type': 'application/json', 'Authorization': 'token12345' }}).map(data => data as WsPersonaContract);
  }

  getById(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    return this.http.get(URL_SERVER + "/" + _Data.Entity.Id)
    .map(data => data as WsPersonaContract);
  }
  postEntity(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    throw new Error("Method not implemented.");
  }
  PutEntity(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    throw new Error("Method not implemented.");
  }
  deleteEntity(_Data: WsPersonaContract): Observable<WsPersonaContract> {
    throw new Error("Method not implemented.");
  }


}
