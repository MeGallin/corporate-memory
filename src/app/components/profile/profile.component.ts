import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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

        const email = this.profile.name;
        const subId = this.profile.sub;
        const emailArray = { email: email, subId: subId };
        this.sendEmail(JSON.stringify({ ...emailArray }));
      });
    }
  }

  sendEmail(email) {
    console.log(email);
    // const emailArray = { email: email };
    this._Http.postSession(email).subscribe(
      (res) => {
        console.log('Session done', res);
        return res;
      },
      (err) => {
        //  console.log('There was an error', err);
        return err;
      }
    );
  }
}
