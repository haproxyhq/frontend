import {Injectable, EventEmitter} from 'angular2/core';
import {Response, Headers}        from 'angular2/http';

import {Credentials}              from '../../models/credentials.model';

import {GlobalStorageService}     from './global-storage.service';
import {CustomHttpService}        from './custom-http.service';
import {UserService}              from '../user/user.service';
import {CompletionService}        from '../completion/completion.service';
import {MqttBrokerService}        from './mqtt-broker.service';

@Injectable()
export class AuthenticationService {
  constructor(private _http: CustomHttpService,
    private _globalStorage: GlobalStorageService,
    private _userService: UserService,
    private _completionService: CompletionService,
    private _mqttBrokerService: MqttBrokerService) { }

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

                //initially load completions
                this._completionService.getCompletions().subscribe(
                  (res) => {
                    this._globalStorage.completions = res;
                  },
                  () => {}
                );

                //initially load mqtt broker info
                this._mqttBrokerService.getBrokerInfo().subscribe((res) => {
                  this._globalStorage.mqttBroker = res;
                });

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
