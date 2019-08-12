import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[] = [];

  constructor(private angularFireDatabase: AngularFireDatabase) {

  }

  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createOrEditUser(user) {
    return this.getUserById(user.uid).set(user);
  }

}
