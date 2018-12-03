export interface iPage<T>{

    //Propiedades
    BaseEntityList: T[];

    //Métodos
    onAddClick(data: T):void;
    onUpdateClick(data: T):void;
    onDeleteClick(data: T):void;
    loadData():void;
}