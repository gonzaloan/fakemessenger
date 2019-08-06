import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friends: User[] = [];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.friends = this.userService.getFriends();

    // Buscamos en nuestro arreglo el id que enviamos
    this.friend = this.friends.find((record) => record.uid == this.friendId);
    console.log(this.friend);
  }


  ngOnInit() {
  }

}
