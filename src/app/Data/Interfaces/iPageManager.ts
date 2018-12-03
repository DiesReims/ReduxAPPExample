import { EnumTipoAccion } from "../Enums/enumTipoAccion";

export interface iPageManager<T>{

    //Propiedades
    BaseEntity: T;
    TipoAccion: EnumTipoAccion;

    //Métodos
    onSubmitForm(Data: T);
}