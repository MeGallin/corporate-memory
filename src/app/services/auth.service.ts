import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from '../__envDev';
import { AUTH_CONFIG_PROD } from '../__envProd';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile'
  });

  // auth0 = new auth0.WebAuth({
  //   clientID: AUTH_CONFIG_PROD.clientID,
  //   domain: AUTH_CONFIG_PROD.domain,
  //   responseType: "token id_token",
  //   redirectUri: AUTH_CONFIG_PROD.callbackURL,
  //   scope: "openid profile"
  // });

  userProfile: any;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '#';
        this.setSession(authResult);
        this.router.navigate(['/profile']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/home']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    if (!localStorage.getItem('access_token')) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(
      localStorage.getItem('access_token'),
      (err, profile) => {
        if (profile) {
          self.userProfile = profile;
        }
        cb(err, profile);
      }
    );
  }
}
