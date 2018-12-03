import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaManagerPage } from './persona-manager';

@NgModule({
  declarations: [
    PersonaManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaManagerPage),
  ],
})
export class PersonaManagerPageModule {}
