import { EnumTipoAccion } from "../Enums/enumTipoAccion";
import { EnumResetForm } from "../Enums/enumResetForm";

export interface iPageManager<T> {

    //Propiedades
    BaseEntity: T;
    TipoAccion: EnumTipoAccion;

    //Métodos
    onSubmitForm(_Data: any): void;

    onCancelForm(): void;

    validationData(_Data: T): Boolean;

    resetForm(_Data: T, _ResetType: EnumResetForm): void;
}