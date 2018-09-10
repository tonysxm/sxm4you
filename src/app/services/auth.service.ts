import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'vEvx8OBXk4q930BWgIBnddUGl0oRO601',
    domain: 'sxm4you.auth0.com',
    responseType: 'token id_token',
    audience: 'https://sxm4you.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });
  userProfile: any;

  constructor(public router: Router,  private http: HttpClient) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile((err, profile) => {
      this.userProfile = profile;
      this.localUserRecordExists(this.userProfile.email).then(function(exists) {
        if (!exists) {
          this.createLocalUserRecord(this.userProfile);
        }
      });
    }, authResult.accessToken);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    // this.router.navigate(['/store-list']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(callBackFunction, accessToken?: any): void {
    if (!accessToken) {
      accessToken = localStorage.getItem('access_token');
    }
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      callBackFunction(err, profile);
    });
  }

  private localUserRecordExists(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:18080/user/exists/' + username)
        .subscribe((response: any) => {
          const user = response.user[0];
          let exists = false;
          if (response.user.length) {
            exists = (user.exists === 1);
          }
          resolve(exists);
        }, reject);
    });
  }

  private createLocalUserRecord(profile: any) {
    console.log('createUser');
  }

}
