import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ConversationService} from '../../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;
  conversation: any [];
  buzz = false;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);


    // Obtenemos el usuario logeado
    this.authenticationService.getStatus().subscribe((userSession) => {
        this.userService.getUserById(userSession.uid)
          .valueChanges()
          .subscribe((user: User) => {
            this.user = user
            // Obtenemos el amigo
            this.userService.getUserById(this.friendId)
              .valueChanges().subscribe((data: User) => {
              this.friend = data;
              // Identificadores de los usuarios
              const ids = [user.uid, this.friend.uid].sort();
              this.conversation_id = ids.join('|');
              this.getConversation();
            }, (error) => console.error(error));
          });
      },
      error => console.error(error));
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message)
      .then((success) => this.textMessage = '');
  }

  sendBuzz() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'buzz'
    };
    this.conversationService.createConversation(message)
      .then(() => {
      });
    this.doBuzz();
  }

  doBuzz() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.buzz = true;
    window.setTimeout(() => {
      this.buzz = false;
    }, 1000);
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id)
      .valueChanges()
      .subscribe((conversation) => {
        console.log(conversation);
        this.conversation = conversation;
        this.conversation.forEach((message) => {
          if (!message.seen) {
            message.seen = true;
            this.conversationService.editConversation(message);
            if (message.type === 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            } else if(message.type === 'buzz'){
              this.doBuzz();
            }
          }
        });
      }, (error) => console.error(error));
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    }
    return this.user.nick;
  }
}
