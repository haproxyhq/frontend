import {Injectable}   from 'angular2/core';
import {Headers}      from 'angular2/http';

import {CookieModel}  from '../../models/cookie.model';

@Injectable()
export class GlobalStorageService {
  private static ACCESS_TOKEN_KEY: string = 'accessToken';
  private static ACCESS_TOKEN_HEADER_KEY: string = 'X-Auth-Token';
  private static IS_AUTHENTICATED_KEY: string = 'authenticated';

  private _headers: Headers;

  private _prefix: string = 'hq.';

  constructor() {
    this._headers = new Headers();
  }

  /**
  * Start of getters/setters for storage items
  **/
  set authenticated(value: boolean) {
    this.set(GlobalStorageService.IS_AUTHENTICATED_KEY, value);
  }

  get authenticated() {
    return this.get(GlobalStorageService.IS_AUTHENTICATED_KEY);
  }

  set accessToken(accessToken: string) {
    this.set(GlobalStorageService.ACCESS_TOKEN_KEY, accessToken);
    this._headers.append(GlobalStorageService.ACCESS_TOKEN_HEADER_KEY, accessToken);
  }

  get accessToken() {
    return this.get(GlobalStorageService.ACCESS_TOKEN_KEY);
  }

  get headers() {
    return this._headers;
  }

  /**
  * Start of public accessible storage functions
  **/
  public set(key: string, value: any): boolean {
    return this.addToLocalStorage(key, value);
  }

  public get(key: string): any {
    return this.getFromLocalStorage(key);
  }

  public clear(): boolean {
    return this.clearAllFromLocalStorage();
  }

  /**
  * Start of private storage helper functions
  **/
  private browserSupportsLocalStorage(): boolean {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
      return false;
    }
  }

  private addToLocalStorage(key: string, value: any): boolean {
    try {
      var stringValue: string;
      if (value instanceof Object) {
        stringValue = JSON.stringify(value);
      } else { stringValue = value; }
    } catch (e) {
      return false;
    }

    if (!this.browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"

      //emmit broadcast about stored item
      return this.addToCookies(key, stringValue);
    }

    try {
      localStorage.setItem(this._prefix + key, stringValue);

      //emmit broadcast about stored item
    } catch (e) {
      //emmit global-storage-service error
      return this.addToCookies(key, stringValue);
    }
    return true;
  }

  private getFromLocalStorage(key): any {
    if (!this.browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      return this.getFromCookies(key);
    }

    let item: string = localStorage.getItem(this._prefix + key);

    if (!item) return null;
    if (item.charAt(0) === '{') return JSON.parse(item);
    return item;
  }

  private removeFromLocalStorage(key: string): boolean {
    if (!this.browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      //emmit broadcast about removed item
      return this.removeFromCookies(key);
    }

    try {
      localStorage.removeItem(this._prefix + key);
      //emmit broadcast about removed item
    } catch (e) {
      //emmit global-storage-service error
      return this.removeFromCookies(key);
    }
    return true;
  }

  private clearAllFromLocalStorage(): boolean {

    if (!this.browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      return this.clearAllFromCookies();
    }

    var prefixLength = this._prefix.length;

    for (var key in localStorage) {
      if (key.substr(0, prefixLength) === this._prefix) {
        try {
          this.removeFromLocalStorage(key.substr(prefixLength));
        } catch (e) {
          //emmit global-storage-service error
          return this.clearAllFromCookies();
        }
      }
    }
    return true;
  }

  private browserSupportsCookies(): boolean {
    try {
      return navigator.cookieEnabled ||
        ('cookie' in document && (document.cookie.length > 0 ||
          (document.cookie = 'test').indexOf.call(document.cookie, 'test') > -1));
    } catch (e) {
      //emmit global-storage-service error
      return false;
    }
  }

  private addToCookies(key: string, value: string): boolean {
    if (!this.browserSupportsCookies()) {
      //emmit error "cookies not supported"
      return false;
    }

    try {
      let expiry: string = '';
      let removeExpiry: number = 1;
      let expiryDate: Date = new Date();
      let cookie: CookieModel = new CookieModel();

      if (value === null) {
        removeExpiry = -1;
        value = '';
      }

      if (cookie.expiry !== 0) {
        expiryDate.setTime(expiryDate.getTime() + (cookie.expiry * 24 * 60 * 60 * 1000 * removeExpiry));
        expiry = '; expires=' + expiryDate.toUTCString();
      }
      if (!!key) {
        document.cookie = this._prefix + key + '=' + encodeURIComponent(value) + expiry + '; path=' + cookie.path;
      }
    } catch (e) {
      //emmit global-storage-service error
      return false;
    }
    return true;
  }

  private getFromCookies(key: string): any {
    if (!this.browserSupportsCookies()) {
      //emmit error "cookies not supported"
      return false;
    }

    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var thisCookie = cookies[i];
      while (thisCookie.charAt(0) === ' ') {
        thisCookie = thisCookie.substring(1, thisCookie.length);
      }
      if (thisCookie.indexOf(this._prefix + key + '=') === 0) {
        let tmp = decodeURIComponent(thisCookie.substring(this._prefix.length + key.length + 1, thisCookie.length));
        if (tmp.charAt(0) === '{') return JSON.parse(tmp);
        return tmp;
      }
    }
    return null;
  }

  private removeFromCookies(key: string): boolean {
    return this.addToCookies(key, null);
  }

  private clearAllFromCookies(): boolean {
    let thisCookie: string = null;
    let thisKey: string = null;
    let prefixLength: number = this._prefix.length;
    let cookies: string[] = document.cookie.split(';');
    let returnValue: boolean = true;

    for (var i = 0; i < cookies.length; i++) {
      thisCookie = cookies[i];
      while (thisCookie.charAt(0) === ' ') {
        thisCookie = thisCookie.substring(1, thisCookie.length);
      }
      let key = thisCookie.substring(prefixLength, thisCookie.indexOf('='));
      if (returnValue) returnValue = this.removeFromCookies(key);
    }
    return returnValue;
  }
}
