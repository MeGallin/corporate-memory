import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  constructor(public _Auth: AuthService, private _Http: HttpService) {}

  ngOnInit(): void {
    if (this._Auth.userProfile) {
      this.profile = this._Auth.userProfile;
    } else {
      this._Auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
  sendEmail(email) {
    console.log(email);
    this._Http.postSession(this.profile.name);
  }
}
