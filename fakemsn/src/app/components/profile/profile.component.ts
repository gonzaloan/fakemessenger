import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any = '';

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private firebaseStorage: AngularFireStorage) {
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
    if (this.croppedImage) {
      const currentAvatarId = Date.now();
      const pictures = this.firebaseStorage
        .ref('pictures/' + currentAvatarId + '.jpg')
        .putString(this.croppedImage, 'data_url');

      pictures.then((result) => {
        // Crear
        this.picture = this.firebaseStorage.ref('pictures/' + currentAvatarId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid)
            .then(() => {
              alert('Avatar uploaded OK');
            }).catch((error) => console.error(error));
        });

      })
        .catch((error) => console.error(error));
    } else {
      this.userService.createOrEditUser(this.user)
        .then(() => {
          alert('User saved');
        }, (error) => console.error(error));
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }
}
