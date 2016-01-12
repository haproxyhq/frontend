import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {User}                     from '../../models/wrapper/user.model';

@Injectable()
export class UserService {

  constructor(private _http: CustomHttpService) {}

  public getUser(email: string): EventEmitter<User> {
    var event: EventEmitter<User> = new EventEmitter();

    this._http.get('http://localhost:8080/users/search/findUserByEmail?email=' + email)
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          event.emit(new User(res));
        },
        (err) => {
          event.emit(null);
        },
        () => {}
    );

    return event;
  }

  public saveUser(user: User): EventEmitter<User> {
    let event: EventEmitter<User> = new EventEmitter<User>();

    this._http.patch(user.getSelfLink(), JSON.stringify(user.getRestModel()))
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          event.next(new User(res));
        },
        (err) => {
          event.next(null);
        },
        () => {}
    );
    return event;
  }
}
