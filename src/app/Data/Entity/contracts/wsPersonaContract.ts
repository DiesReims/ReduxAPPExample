import { iContract } from "../../Interfaces/iContract";
import { Persona } from "../persona";

export class WsPersonaContract implements iContract<Persona>{

    Entity: Persona;
    EntityList: Persona[];
    Message: string;
    StatusCode: number;
    
    constructor(){     
    }
}