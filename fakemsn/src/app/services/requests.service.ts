import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDataBase: AngularFireDatabase) {

  }

  createRequest(request) {
    // Reemplazamos los puntos en el correo, ya que Firebase lo toma como error

    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDataBase
      .object('requests/' + cleanEmail + '/' + request.sender)
      .set(request);
  }

  /**
   * Coloca status a un request que estamos enviando.
   */
  setRequestStatus(request, status) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDataBase
      .object('requests/' + cleanEmail + '/' + request.sender + '/status')
      .set(status);
  }

  /**
   * Service verifica que usuario que entran tienen request pendiente
   */
  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDataBase
      .list('requests/' + cleanEmail);
  }
}
