import {Injectable}   from 'angular2/core';
import {Headers}      from 'angular2/http';

import {CookieModel}  from '../../models/cookie.model';
import {User}         from '../../models/wrapper/user.model';
import {Completion}   from '../../models/wrapper/completion.model';

@Injectable()
export class GlobalStorageService {
  public static ACCESS_TOKEN_HEADER_KEY: string = 'X-Auth-Token';

  private static ACCESS_TOKEN_KEY: string = 'accessToken';
  private static IS_AUTHENTICATED_KEY: string = 'authenticated';
  private static USER_KEY: string = 'user';
  private static COMPLETIONS_KEY: string = 'completions';

  private _prefix: string = 'hq.';

  constructor() {}

  /**
  * Start of getters/setters for storage items
  **/
  set authenticated(value: boolean) {
    this.set(GlobalStorageService.IS_AUTHENTICATED_KEY, value);
  }

  get authenticated(): boolean {
    return this.get(GlobalStorageService.IS_AUTHENTICATED_KEY);
  }

  set accessToken(accessToken: string) {
    this.set(GlobalStorageService.ACCESS_TOKEN_KEY, accessToken);
  }

  get accessToken(): string {
    return this.get(GlobalStorageService.ACCESS_TOKEN_KEY);
  }

  set user(user: User) {
    this.set(GlobalStorageService.USER_KEY, user);
  }

  get user(): User {
    return new User(this.get(GlobalStorageService.USER_KEY));
  }

  set completions(completions: Array<Completion>) {
    this.set(GlobalStorageService.COMPLETIONS_KEY, completions);
  }

  get completions() {
    let completions: Array<Completion> = new Array<Completion>();
    let plainObject = JSON.parse(this.get(GlobalStorageService.COMPLETIONS_KEY));
    if (plainObject !== null) {
      plainObject.forEach((elem, index, array) => {
        completions.push(new Completion(elem));
      });
    }
    return completions;
  }

  /**
  * Start of public accessible storage functions
  **/
  public set(key: string, value: any): boolean {
    return this._addToLocalStorage(key, value);
  }

  public get(key: string): any {
    return this._getFromLocalStorage(key);
  }

  public clear(): boolean {
    return this._clearAllFromLocalStorage();
  }

  /**
  * Start of private storage helper functions
  **/
  private _browserSupportsLocalStorage(): boolean {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);
    } catch (e) {
      return false;
    }
  }

  private _addToLocalStorage(key: string, value: any): boolean {
    try {
      var stringValue: string;
      if (value instanceof Object) {
        stringValue = JSON.stringify(value);
      } else { stringValue = value; }
    } catch (e) {
      return false;
    }

    if (!this._browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"

      //emmit broadcast about stored item
      return this._addToCookies(key, stringValue);
    }

    try {
      localStorage.setItem(this._prefix + key, stringValue);

      //emmit broadcast about stored item
    } catch (e) {
      //emmit global-storage-service error
      return this._addToCookies(key, stringValue);
    }
    return true;
  }

  private _getFromLocalStorage(key): any {
    if (!this._browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      return this._getFromCookies(key);
    }

    let item: string = localStorage.getItem(this._prefix + key);

    if (!item) return null;
    if (item.charAt(0) === '{') return JSON.parse(item);
    return item;
  }

  private _removeFromLocalStorage(key: string): boolean {
    if (!this._browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      //emmit broadcast about removed item
      return this._removeFromCookies(key);
    }

    try {
      localStorage.removeItem(this._prefix + key);
      //emmit broadcast about removed item
    } catch (e) {
      //emmit global-storage-service error
      return this._removeFromCookies(key);
    }
    return true;
  }

  private _clearAllFromLocalStorage(): boolean {

    if (!this._browserSupportsLocalStorage()) {
      //emmit error "local storage not supported"
      return this._clearAllFromCookies();
    }

    var prefixLength = this._prefix.length;

    for (var key in localStorage) {
      if (key.substr(0, prefixLength) === this._prefix) {
        try {
          this._removeFromLocalStorage(key.substr(prefixLength));
        } catch (e) {
          //emmit global-storage-service error
          return this._clearAllFromCookies();
        }
      }
    }
    return true;
  }

  private _browserSupportsCookies(): boolean {
    try {
      return navigator.cookieEnabled ||
        ('cookie' in document && (document.cookie.length > 0 ||
          (document.cookie = 'test').indexOf.call(document.cookie, 'test') > -1));
    } catch (e) {
      //emmit global-storage-service error
      return false;
    }
  }

  private _addToCookies(key: string, value: string): boolean {
    if (!this._browserSupportsCookies()) {
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

  private _getFromCookies(key: string): any {
    if (!this._browserSupportsCookies()) {
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

  private _removeFromCookies(key: string): boolean {
    return this._addToCookies(key, null);
  }

  private _clearAllFromCookies(): boolean {
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
      if (returnValue) returnValue = this._removeFromCookies(key);
    }
    return returnValue;
  }
}
