import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iPageManager } from '../../app/Data/Interfaces/iPageManager';
import { Persona } from '../../app/Data/Entity/persona';
import { EnumTipoAccion } from '../../app/Data/Enums/enumTipoAccion';
import { EnumResetForm } from '../../app/Data/Enums/enumResetForm';
import { ControlAlertProvider } from '../../providers/control-alert/control-alert';

/**
 * Generated class for the PersonaManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-persona-manager',
  templateUrl: 'persona-manager.html',
})
export class PersonaManagerPage implements iPageManager<Persona> {

  BaseEntity: Persona;
  TipoAccion: EnumTipoAccion;
  personaForm: FormGroup;
  Nacionalidad: { id: number, strValor: string }[]

  selectOptions: any = {
    title: 'Nacionalidad',
    subTitle: 'Selecciona tu nacionalidad',
    mode: 'md'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private fB: FormBuilder, private toastCtrl: ToastController, private alertCtrl: ControlAlertProvider) {
    this.TipoAccion = EnumTipoAccion.AGREGAR;
    this.personaForm = this.fB.group({
      'nombre': ['', [Validators.required, Validators.maxLength(50)]],
      'aMaterno': ['', [Validators.required, Validators.maxLength(50)]],
      'aPaterno': ['', [Validators.required, Validators.maxLength(50)]],
      'dteFechaNac': ['', [Validators.required]],
      'idNacionalidad': [0, [Validators.required, Validators.min(1)]]
    });
    this.Nacionalidad = [{ id: 1, strValor: 'Mexicana' }, { id: 2, strValor: 'Peruana' }, { id: 3, strValor: 'Canadiense' }, { id: 4, strValor: 'Chilena' }]
  }

  ionViewDidLoad() {
  }

  onSubmitForm(_Data: any): void {
    this.BaseEntity = {
      Id: 0,
      StrNombre: _Data.nombre,
      StrAPaterno: _Data.aPaterno,
      StrAMaterno: _Data.aMaterno,
      IdNacionalidad: _Data.idNacionalidad,
      DteFechaNac: _Data.dteFechaNac,
      picImage: ''
    }
    if (!this.validationData(this.BaseEntity)) {
      this.resetForm(_Data, EnumResetForm.INVALID_RESET);
      return;
    }
    //Llamada a web service para guardar.
  }

  validationData(_Data: Persona): Boolean {
    let year = new Date().getFullYear();
    let yearUser  = new Date(_Data.DteFechaNac).getFullYear();
    if ((year - yearUser) < 18) {
      this.createToast('Usted debe tener 18 años o más.');
      return false;
    }
    return true;
  }

  resetForm(_Data: Persona, _ResetType: EnumResetForm): void {
    switch (_ResetType) {
      case EnumResetForm.INVALID_RESET:
        /*this.personaForm.reset({
          'nombre': _Data.StrNombre,
          'aPaterno': _Data.StrAPaterno,
          'aMaterno': _Data.StrAMaterno,
          'idNacionalidad': _Data.IdNacionalidad,
          'dteFechaNac': _Data.DteFechaNac
        });
        */
       this.personaForm.markAsPristine();
        break;
      case EnumResetForm.FULL_RESET:
        this.personaForm.reset();
        break;
      default:
        break;
    }
  }

  onCancelForm(): void {
    if (this.personaForm.pristine){
      this.navCtrl.pop()
    }
    else{
      let res = this.alertCtrl.showConfirmAlert('Cambios Detectados','¿Deseas realmente salir sin guardar?');
      res.then(_=>{
        if (_){
          this.navCtrl.pop();
        }
      }).catch(err => {
        console.log('Ha ocurrido el error:' + err);
      });
    }
  }

  private createToast(_mess: string) {
    const toast = this.toastCtrl.create({
      message: _mess,
      duration: 1500
    });
    toast.present();
  }
}
