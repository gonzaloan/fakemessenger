import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  friends: User[] = [];

  constructor(private userService: UserService) {
    this.friends = this.userService.getFriends();
    console.log(this.friends);
  }

  ngOnInit() {
  }

}
