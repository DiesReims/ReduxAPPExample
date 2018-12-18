import { iContract } from "../../Interfaces/iContract";
import { User } from "../user";

export class WsUserContract implements iContract<User>{
    Entity: User;
    EntityList: User[];
    Message: string;
    StatusCode: number;
}