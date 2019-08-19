import {Component} from '@angular/core';
import {DialogComponent, DialogService} from 'ng2-bootstrap-modal';
import {UserService} from '../../services/user.service';
import {RequestsService} from '../../services/requests.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {

  scope: any;
  currentRequest: any;


  shouldAdd = 'yes';

  constructor(public dialogService: DialogService,
              private userService: UserService,
              private requestService: RequestsService) {
    super(dialogService);
  }

  accept() {
    if (this.shouldAdd == 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted')
        .then((data) => {
          console.log(data);
          this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender)
            .then(() => alert('Request accepted'))
            .catch((error) => console.error(error));
        }).catch((error) => console.error(error));
    } else if (this.shouldAdd == 'no') {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected')
        .then((data) => {
          console.log(data);
        }).catch((error) => console.error(error));
    } else if (this.shouldAdd == 'later') {
      this.requestService.setRequestStatus(this.currentRequest, 'decide_later')
        .then((data) => {
          console.log(data);
        }).catch((error) => console.error(error));
    }
  }
}
