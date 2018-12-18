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

    loadDataOnEditMode(_Data: T): void;

    loadTextData(_Data: T): boolean;

    loadOptionsData(_Data: T): boolean;

    loadExtraData(_Data: T): boolean;
}