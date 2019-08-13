import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFirebaseDatabase: AngularFireDatabase) {

  }

  createConversation(conversation) {
    return this.angularFirebaseDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp)
      .set(conversation);
  }


  editConversation(conversation) {
    return this.angularFirebaseDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp)
      .set(conversation);
  }

  /**
   * Retorna todos los mensajes de la conversación
   * @param uid: Id de la conversación
   */
  getConversation(uid) {
    return this.angularFirebaseDatabase.list('conversations/' + uid);
  }

}
