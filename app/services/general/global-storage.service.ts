import {Injectable}   from 'angular2/core';
import {Headers}      from 'angular2/http';

@Injectable()
export class GlobalStorageService {
  private _isAuthenticated: boolean;
  private _accessToken: string;
  private _headers: Headers;

  constructor() {
    this._isAuthenticated = false;
    this._accessToken = '';
    this._headers = new Headers();
  }

  set authenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get authenticated() {
    return this._isAuthenticated;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
    this._headers.append('X-Auth-Token', this._accessToken);
  }

  get accessToken() {
    return this._accessToken;
  }

  get headers() {
    return this._headers;
  }
}
