import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { reducers, metaReducers } from './Reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './Effects/users';
import { UserApiService } from './Services';
import { HttpModule } from '@angular/http';
import { PersonaPage } from '../pages/persona/persona';
import { PersonaManagerPage } from '../pages/persona-manager/persona-manager';
import { ControlAlertProvider } from '../providers/control-alert/control-alert';
import { PersonaServiceProvider } from '../providers/persona-service/persona-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonaImagePage } from '../pages/persona-image/persona-image';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PersonaPage,
    PersonaManagerPage,
    PersonaImagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    EffectsModule.forRoot([UsersEffects]),
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PersonaPage,
    PersonaManagerPage,
    PersonaImagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ControlAlertProvider,
    PersonaServiceProvider,
  ]
})
export class AppModule {}
