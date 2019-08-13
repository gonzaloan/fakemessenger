import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {ConversationComponent} from './components/conversation/conversation.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {SearchPipe} from './pipes/search.pipe';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AuthenticationGuard} from './services/authentication.guard';
import {ImageCropperModule} from 'ngx-image-cropper';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database featu<res
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
