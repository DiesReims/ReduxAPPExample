import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { iPage } from '../../app/Data/Interfaces/iPage';
import { Persona } from '../../app/Data/Entity/persona';
import { ControlAlertProvider } from '../../providers/control-alert/control-alert';
import { PersonaManagerPage } from '../persona-manager/persona-manager';
import { PersonaServiceProvider } from '../../providers/persona-service/persona-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-persona',
  templateUrl: 'persona.html',
})
export class PersonaPage implements iPage<Persona> {

  BaseEntityList: Persona[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: ControlAlertProvider,private toastCtrl: ToastController ,private personaServ: PersonaServiceProvider) {
    console.log("Constructor por defecto");
    this.loadData();
  }

  loadData(): void {
    console.log('Cargando datos del formulario');
    this.BaseEntityList = [{Id:1,StrNombre:'Diego A.',StrAPaterno:'Zárate',StrAMaterno:'Lara', DteFechaNac: new Date, IdNacionalidad:1,picImage:''}];
    let resCllBck$ = this.personaServ.getAll();
    resCllBck$.subscribe(data => {
      this.BaseEntityList = data.EntityList;
    },
    _err =>{
      this.createToast('Ha ocurrido un error al cargar los datos');
    }
    );
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

  private createToast(_mess:string){
    const toast = this.toastCtrl.create({
      message: _mess,
      duration:1500
    });
    toast.present();
  }

}
