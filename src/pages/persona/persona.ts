import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { iPage } from '../../app/Data/Interfaces/iPage';
import { Persona } from '../../app/Data/Entity/persona';
import { ControlAlertProvider } from '../../providers/control-alert/control-alert';
import { PersonaManagerPage } from '../persona-manager/persona-manager';

@IonicPage()
@Component({
  selector: 'page-persona',
  templateUrl: 'persona.html',
})
export class PersonaPage implements iPage<Persona> {

  BaseEntityList: Persona[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: ControlAlertProvider) {
    console.log("Constructor por defecto");
    this.loadData();
  }

  loadData(): void {
    console.log('Cargando datos del formulario');
    this.BaseEntityList = [{Id:1,StrNombre:'Diego A.',StrAPaterno:'Zárate',StrAMaterno:'Lara', DteFechaNac: Date.now(), IdNacionalidad:1,picImage:''}];
  }

  onAddClick(data: Persona): void {
    //this.alertCtrl.showBasicAlert('Información','Agregar con:' + data.StrNombre);
    this.navCtrl.push(PersonaManagerPage);
  }
  onUpdateClick(data: Persona): void {
    alert('Editar con:' + data.StrNombre);
  }
  onDeleteClick(data: Persona): void {
    const res = this.alertCtrl.showConfirmAlert('Información','¿Deseas eliminar: ' + data.StrNombre + '?');
    res.then(data => {
      if(data){
        //Eliminar registro
      }
      else{
        //Omitir borrado.
      }
      console.log("Se ha determinado," + data);
    });
  }

}
