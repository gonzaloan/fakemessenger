import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  operation: String = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then((data) => {
        alert('Logged Correctly');
        console.log(data);
        this.router.navigate(['home']);
      }).catch((error) => {
      alert('Theres an error while login');
      console.log(error);
    });
  }

  register() {
    this.authenticationService.createUserWithEmail(this.email, this.password)
      .then((data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick,
        };
        this.userService
          .createOrEditUser(user)
          .then((userData) => {
            alert('Register Correctly');
            console.log(userData);
            this.router.navigate(['home']);
          }).catch((errorData) => {
          alert('Theres an error while registering');
          console.log(errorData);
        });
      }).catch((error) => {
      console.log(error);
    });
  }

  loginWithFacebook() {
    this.authenticationService.loginWithFacebook()
      .then((data) => {
        alert('Login with Facebook OK');
        console.log(data);
        this.router.navigate(['home']);
      }).catch((error) => {
      alert('Login with Facebook error');
      console.log(error);
    });
  }


}
