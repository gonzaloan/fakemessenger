import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  friends: User[] = [];
  query = '';

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.userService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });
    console.log(this.friends);
  }

  ngOnInit() {
  }

  logout() {
    return this.authenticationService.logout()
      .then((logout) => {
        alert('Session ended');
        this.router.navigate(['login']);
      })
      .catch((error) => console.log(error));
  }

}
