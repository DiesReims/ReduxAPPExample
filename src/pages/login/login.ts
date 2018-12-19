import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../app/Reducers';
import { Observable } from 'rxjs';
import { User } from '../../app/Data/Entity/user';
import * as fromUsersActions from '../../app/Actions/user';
import { HomePage } from '../home/home';
import { WsUserContract } from '../../app/Data/Entity/contracts/wsUserContract';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Variable de formulario reactivo, ocupada para toda la información.
  private loginForm: FormGroup;

  //Información ocupada en el formulario de tipo Observable<T>. La normativa especifica colocar un "$" al final.
  currentUser$: Observable<User>
  isLoading$: Observable<boolean>
  isLogged$: Observable<boolean>
  _loader: Loading; //Variable utilizada para mostrar el loader.

  //Constructor de la página de login
  constructor(public navCtrl: NavController, //Controladora de Nav. (Navegar entre páginas).
    private toastCtrl: ToastController, //Controladora de Toast. (Mostrar toast)
    public navParams: NavParams, //Parametros de navegación.
    private fB: FormBuilder, //FormBuilder, FormGroup, FormValidators (Para formularios reactivos).
    private _loadingCtrl: LoadingController, //Controladora de loader (Mostrar loaders).
    private _store: Store<State>) //Store (Encargado de guardar todo el estado de la aplicación).
  {
    this.loginForm = fB.group({
      usuario: ['', [Validators.required, Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.maxLength(25)]]
    });
    //Variables del formulario de tipo Observable<T>, se obtienen del Store.
    this.currentUser$ = _store.select(state => state.users.currentUser);
    this.isLoading$ = _store.select(state => state.users.isLoading);
    this.isLogged$ = _store.select(state => state.users.isLogged);
  }

  ionViewDidLoad() {
  }

  //Método de login inicial (OBSOLETO)
  private onLogin() {
    this.isLoading$.subscribe(val => {
      //this.updateLoader(val); TODO: Corregir error ViewCannotFound
    })
    //Cargamos los datos del formulario
    const formData = this.loginForm.value;
    const loginData: User = this.loginForm.value;
    //Despachamos la acción logUser() encargada de logear los valores del formulario.
    this._store.dispatch(new fromUsersActions.logUser(loginData));
    this.isLogged$.subscribe(data => {
      if (data) {
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.showToast('Usuario Inválido!');
      }
    },
      err => console.log('Ha ocurrido un error:' + err))
  }

  //Método de login actual.
  private async onLogin2() {
    this.isLoading$.subscribe(val => {
      //this.updateLoader(val);
      console.log(val); //Verificamos el valor de la variable isLoading$
    })
    const formData = this.loginForm.value; //Obtenemos los valores del formulario.
    let loginData: User = { Id: 0, StrUsuario: formData.usuario, StrPassword: formData.password, StrToken: '', permisos: [] }; //Inicializamos un objeto de tipo User (Interface).
    let contract = new WsUserContract();
    contract.Entity = loginData;
    await this._store.dispatch(new fromUsersActions.logUser(contract));//Despachamos la acción logUser() encargada de logear los valores del formulario.
    this.currentUser$.subscribe(user => {
      if (user) {
        //Si el valor de isLogged$ es true: Inicio de sesión correcto.
        this.navCtrl.setRoot(HomePage);
      }
      else {
        //Si el valor de inicio de sesión es incorrecto.
        this.showToast('El usuario es inválido.');
      }
    },
    _err => console.log("Ha ocurrido un error: " + _err));
  }


  //Método encargado de actualizar el loader de acuerdo al valor
  private updateLoader(isLoading: boolean) {
    if (isLoading) {
      //Crea un nuevo loader y lo muestra.
      this._loader = this._loadingCtrl.create();
      this._loader.present();
    }
    else {
      if (this._loader) {
        this._loader.dismiss();
      }
    }
  }

  //Método encargado de mostar el toast.
  private showToast(_text: string) {
    const tstAlert = this.toastCtrl.create({
      message: _text,
      duration: 1000
    });
    tstAlert.present();
  }

  private onCancelClicked() {
    this.loginForm.reset();
  }
}
