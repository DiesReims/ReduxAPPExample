import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class ControlAlertProvider {

  resultConfirmDialog: boolean;

  constructor(private alertCtrl: AlertController) {
  }


  public showBasicAlert(_titulo: string, _mess: string): void {
    const alert = this.alertCtrl.create({
      title: _titulo,
      subTitle: _mess,
      buttons: ['OK']
    });
    alert.present();
  }

  public showConfirmAlert(_titulo: string, _mess: string): Promise<boolean> {
    return new Promise((resolve, rejected) => {
      const alert = this.alertCtrl.create({
        title: _titulo,
        subTitle: _mess,
        buttons: [
          { text: 'Cancelar', handler: () => resolve(false) },
          { text: 'Aceptar', handler: () => resolve(true) }]
      });
      alert.present();
    })
  }
}
