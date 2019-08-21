import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Recibirá Desde componente padre o hijo, se mande información
  @Input() uid: string;
  contact: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('Contact: ' + this.uid);
    this.userService.getUserById(this.uid)
      .valueChanges()
      .subscribe((data: User) => this.contact = data);
  }

}
