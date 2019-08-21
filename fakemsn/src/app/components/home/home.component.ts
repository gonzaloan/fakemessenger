import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestsService} from '../../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  friends: User[] = [];
  query = '';
  closeResult: string;
  friendEmail = '';
  user: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private modalService: NgbModal,
              private requestService: RequestsService) {
    this.userService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });

    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid)
          .valueChanges().subscribe((user: User) => {
          this.user = user;
          if (this.user.friends) {
            this.user.friends = Object.values(this.user.friends);
          }
        });
      }
    )
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request)
      .then(() => {
        alert('Request sended');
      }).catch((error) => {
      console.error(error);
    });
  }
}
