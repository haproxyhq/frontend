import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {User}                     from '../../models/wrapper/user.model';
import {EmptyRestModel} from '../../models/empty-rest.model';

/**
 * this service takes care of all CRUD operations regarding users
 */
@Injectable()
export class UserService {

  constructor(private _http: CustomHttpService) {}

  /**
   * returns one specific user identified by email
   *
   * @param email the users email
   * @returns {EventEmitter<User>}
   */
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

  /**
   * gets all users
   *
   * @returns {EventEmitter<Array<User>>}
   */
  public getUsers(): EventEmitter<Array<User>> {
    var event: EventEmitter<Array<User>> = new EventEmitter();

    this._http.get('http://localhost:8080/users/')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let users: Array<User> = [];
          if(res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((elem, index, array) => {
              users.push(new User(elem));
            });
          }
          event.emit(users);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );

    return event;
  }

  /**
   * saves all changes made to a user
   *
   * @param user the changed user
   * @returns {EventEmitter<User>}
   */
  public saveUser(user: User): EventEmitter<User> {
    let event: EventEmitter<User> = new EventEmitter<User>();

    this._http.patch(user.getSelfLink(), user.getRestModel())
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

  /**
   * deletes a given user
   *
   * @param user
   */
  public deleteUser(user: User): void {
    this._http.delete(user.getSelfLink())
      .subscribe();
  }

  /**
   * creates a new user
   *
   * @param user the user to create
   * @param isAdmin determines whether this user is a admin, or normal user
   * * @returns {EventEmitter<User>}
   */
  public createUser(user: User, isAdmin: boolean = false): EventEmitter<User> {
    let event: EventEmitter<User> = new EventEmitter<User>();

    //TODO: remove this when passwords are generated randomly by backend
    var tempUser = user.getRestModel();
    tempUser['password'] = 'abc123abc';

    this._http.post('http://localhost:8080/users/', tempUser)
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
}
