import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../app/Reducers';
import { Observable } from 'rxjs';
import { User } from '../../app/Data/Entity/user';
import * as fromUsersActions from '../../app/Actions/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;

  //Información ocupada en el formulario de tipo observable.
  currentUser$: Observable<User>
  isLoading$: Observable<boolean>
  isLogged$: Observable<boolean>
  //Usado para mostrar el loeader.
  _loader: Loading;

  //Inyectamos en el constructor la dependencia del store.
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
     public navParams: NavParams,
      fB: FormBuilder,
    private _loadingCtrl: LoadingController,
    private _store: Store<State>) {
    this.loginForm = fB.group({
      usuario:['',[Validators.required,Validators.maxLength(25)]],
      password: ['',[Validators.required, Validators.maxLength(25)]]
    });
    //Cargamos la información de la store.
    this.currentUser$ = _store.select(state => state.users.currentUser);
    this.isLoading$ = _store.select(state => state.users.isLoading);
    this.isLogged$ = _store.select(state => state.users.isLogged);
  }

  ionViewDidLoad() {
  }

  private onLogin(){
    this.isLoading$.subscribe( val => {
      //this.updateLoader(val);
    })
    //Cargamos los datos del formulario
    const formData = this.loginForm.value;
    const loginData: User = this.loginForm.value;
    //Llamamos nuestro evento.
    this._store.dispatch(new fromUsersActions.logUser(loginData));
    this.isLogged$.subscribe(data => {
      if(data){
        this.navCtrl.setRoot(HomePage);
      }
      else{
        this.showToast('Usuario Inválido!');
      }
    },
     err => console.log('Ha ocurrido un error:' + err))
  }

  private onLogin2(){
    this.isLoading$.subscribe( val => {
      //this.updateLoader(val);
      console.log(val);
    })
    //Cargamos los datos del formulario
    //this.loaderCreation();
    const formData = this.loginForm.value;
    let loginData: User;
    loginData = {Id: 0,StrUsuario: formData.usuario, StrPassword: formData.password, permisos: []};
    //Llamamos nuestro evento.
    this._store.dispatch(new fromUsersActions.logUser(loginData));
    this.isLogged$.finally(()=>{
      //this._loader.dismiss();
    }).subscribe(data => {
      if(data){
        this.navCtrl.setRoot(HomePage);
      }
      else{
        this.showToast('Usuario Inválido!');
      }
    },
     err => console.log('Ha ocurrido un error:' + err));
  }

  private updateLoader(isLoading: boolean){
    if (isLoading){
      //Crea un nuevo loader y lo muestra.
      this._loader = this._loadingCtrl.create();
      this._loader.present();
    }
    else{
      if(this._loader){
        this._loader.dismiss();
      }
    }
  }

  private showToast(_text: string){
    const tstAlert = this.toastCtrl.create({
      message: _text,
      duration: 1000
    });
    tstAlert.present();
  }

  private loaderCreation(){
    this._loader = this._loadingCtrl.create();
    this._loader.present();
  }

}
