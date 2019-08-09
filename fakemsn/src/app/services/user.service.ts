import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  friends: User[] = [];

  constructor() {
    const user1: User = {
      nick: 'Eduardo',
      subNick: 'Chorizo Ampón',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1
    };
    const user2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friend: true,
      uid: 2
    };
    const user3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friend: true,
      uid: 3
    };
    const user4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friend: false,
      uid: 4
    };
    const user5: User = {
      nick: 'Marcos',
      age: 30,
      email: 'marcos@aoe.aoe',
      friend: false,
      uid: 5
    };
    this.friends.push(user1, user2, user3, user4, user5);
  }

  getFriends() {
    return this.friends;
  }
}
