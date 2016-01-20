import {Injectable, EventEmitter} from 'angular2/core';
import {Response, Headers}        from 'angular2/http';

import {Credentials}              from '../../models/credentials.model';

import {GlobalStorageService}     from '../../services/general/global-storage.service';
import {CustomHttpService}        from '../../services/general/custom-http.service';
import {UserService}              from '../../services/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private _http: CustomHttpService, private _globalStorage: GlobalStorageService, private _userService: UserService) { }

  login(user: Credentials): EventEmitter<boolean> {
    var event: EventEmitter<boolean> = new EventEmitter();
    var headers: Headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    this._http.post('http://localhost:8080/login', user, { headers:headers })
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          this._globalStorage.accessToken = res.accessToken;
          this._userService.getUser(user.username).subscribe(
            (user) => {
              if (user !== null) {
                this._globalStorage.authenticated = true;
                this._globalStorage.user = user;
                event.emit(true);
              } else event.emit(false);
            },
            () => {}
          );
        },
        (err) => {
          event.emit(false);
        },
        () => {}
    );
    return event;
  }

  logout(): boolean {
    return this._globalStorage.clear();
  }
}
