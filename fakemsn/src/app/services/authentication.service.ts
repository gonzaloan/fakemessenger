import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {

  }

  loginWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  getStatus() {
    return this.angularFireAuth.authState;
  }

  logout(){
    return this.angularFireAuth.auth.signOut();
  }
}
