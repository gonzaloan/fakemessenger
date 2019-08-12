import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe((success) => {
      this.userService.getUserById(success.uid)
        .valueChanges()
        .subscribe((data: User) => {
          this.user = data;
          console.log(data);
        }, (errorUserService) => console.error(errorUserService));
    }, (error) => console.log(error));
  }

  ngOnInit() {
  }

  saveSettings() {
    this.userService.createOrEditUser(this.user)
      .then(() => {
        alert('User saved');
      }, (error) => console.error(error));
  }
}
