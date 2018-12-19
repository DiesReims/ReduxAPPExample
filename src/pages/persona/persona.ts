import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { iPage } from '../../app/Data/Interfaces/iPage';
import { Persona } from '../../app/Data/Entity/persona';
import { ControlAlertProvider } from '../../providers/control-alert/control-alert';
import { PersonaManagerPage } from '../persona-manager/persona-manager';
import { PersonaServiceProvider } from '../../providers/persona-service/persona-service';

@IonicPage()
@Component({
  selector: 'page-persona',
  templateUrl: 'persona.html',
})
export class PersonaPage implements iPage<Persona> {

  BaseEntityList: Persona[] = [];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: ControlAlertProvider,private loaderCtrl: LoadingController ,private toastCtrl: ToastController, private personaServ: PersonaServiceProvider) {
    console.log("Constructor por defecto");
  }

  public ionViewDidLoad() {
    //this.loadData(); Solo mandamos a llamar en el evento de abajo.
  }
  public ionViewWillEnter() {
    this.updateLoader(true);
    this.loadData();
  }

  loadData(): void {
    console.log('Cargando datos del formulario');
    let resCllBck$ = this.personaServ.getAll();
    resCllBck$.subscribe(data => {
      this.BaseEntityList = data.EntityList;
      this.updateLoader(false);
    },
      _err => {
        this.createToast('Ha ocurrido un error al cargar los datos');
      }
    );
  }

  onAddClick(data: Persona): void {
    this.navCtrl.push(PersonaManagerPage);
  }

  onUpdateClick(data: Persona): void {
    this.navCtrl.push(PersonaManagerPage, { objetoEditar: data })
  }

  onDeleteClick(data: Persona): void {
    const res = this.alertCtrl.showConfirmAlert('Información', '¿Deseas eliminar: ' + data.StrNombre + '?');
    res.then(confirm => {
      if (confirm) {
        let resolveDelete$ = this.personaServ.deleteEntity(data.Id);
        resolveDelete$.subscribe(data => {
          if (data.StatusCode === -1 || data.StatusCode === 1) {
            this.createToast(data.Message);
          }
          else {
            this.createToast('Se ha eliminado de forma satisfactoria.');
            this.loadData();
          }
        })
      }
      else {
        //Se debe omitir el borrado.
      }
    });
  }

  private createToast(_mess: string) {
    const toast = this.toastCtrl.create({
      message: _mess,
      duration: 1500
    });
    toast.present();
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  private noDisponible(): void{
    this.createToast('Esta función no esta disponible.');
  }

    //Método encargado de actualizar el loader de acuerdo al valor
    private updateLoader(isLoading: boolean){
      if (isLoading){
        //Crea un nuevo loader y lo muestra.
        this.loader = this.loaderCtrl.create();
        this.loader.present();
      }
      else{
        if(this.loader){
          this.loader.dismiss();
        }
      }
    }

}
