import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iPageManager } from '../../app/Data/Interfaces/iPageManager';
import { Persona } from '../../app/Data/Entity/persona';
import { EnumTipoAccion } from '../../app/Data/Enums/enumTipoAccion';

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
  Nacionalidad: {id:number,strValor:string}[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private fB: FormBuilder) {
    this.TipoAccion = EnumTipoAccion.AGREGAR;
    this.personaForm = this.fB.group({
      'nombre': ['', [Validators.required, Validators.maxLength(50)]],
      'aMaterno': ['', [Validators.required, Validators.maxLength(50)]],
      'aPaterno': ['', [Validators.required, Validators.maxLength(50)]],
      'dteFechaNac': ['', [Validators.required, Validators.min(1990)]]
    });
    this.Nacionalidad = [{id:1,strValor:'Mexicana'},{id:2,strValor:'Peruana'}]
  }

  ionViewDidLoad() {
  }

  onSubmitForm(Data: Persona) {
    throw new Error("Method not implemented.");
  }

}
