import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Response}           from 'angular2/http';

import {GlobalStorageService}     from '../../services/general/global-storage.service';

@Injectable()
export class AuthenticationService {
  constructor(private _http:Http, private _globalStorage:GlobalStorageService) { }

  login(user) {
    var event: EventEmitter<boolean> = new EventEmitter();
    var headers = this._globalStorage.headers;

    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    headers.append('Accept', 'application/json;charset=utf-8');

    this._http.post('http://localhost:8080/login', user, { headers:headers })
      .map((res: Response) => res.json())
      .subscribe(
        res => {
          this._globalStorage.authenticated = true;
          this._globalStorage.accessToken = res.accessToken;
          event.next(true);
        },
        () => {
          event.next(false);
        }
    );
    return event;
  }
}
