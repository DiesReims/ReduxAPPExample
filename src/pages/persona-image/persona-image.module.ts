import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaImagePage } from './persona-image';

@NgModule({
  declarations: [
    PersonaImagePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaImagePage),
  ],
})
export class PersonaImagePageModule {

  onFileChange(evt){
    console.log("Se ha seleccionado un nuevo archivo");
  }
}
