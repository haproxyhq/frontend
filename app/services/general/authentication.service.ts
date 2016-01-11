import {Injectable, EventEmitter} from 'angular2/core';
import {Response, Headers}        from 'angular2/http';

import {GlobalStorageService}     from '../../services/general/global-storage.service';
import {CustomHttpService}        from '../../services/general/custom-http.service';

@Injectable()
export class AuthenticationService {
  constructor(private _http: CustomHttpService, private _globalStorage: GlobalStorageService) { }

  login(user): EventEmitter<boolean> {
    var event: EventEmitter<boolean> = new EventEmitter();
    var headers: Headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

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

  logout(): boolean {
    return this._globalStorage.clear();
  }
}
