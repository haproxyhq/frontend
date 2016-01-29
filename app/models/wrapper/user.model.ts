import {Authority}        from './authority.model';
import {Link}             from './link.model';
import {RestWrapperModel} from './rest-wrapper.model';

export class User extends RestWrapperModel {
  private static ADMIN_AUTHORITY_KEY: string = 'ROLE_ADMIN';

  public username: string;
  public firstName: string;
  public name: string;
  public authorities: Array<Authority> = [];
  public links: Array<Link> = [];

  constructor(plainUser: any) {
    super();
    this.transformPlainObject(plainUser);
  }

  protected transformPlainObject(plainObject: any): void {
    this.username = plainObject.username;
    this.firstName = plainObject.firstName;
    this.name = plainObject.name;

    if(plainObject.authorities) {
      plainObject.authorities.forEach((authority, index, array) => {
        this.authorities.push(new Authority(authority.authority, authority.description, authority.name));
      });
    }

    if(plainObject.links) {
      plainObject.links.forEach((link, index, array) => {
        this.links.push(new Link(link.rel, link.href));
      });
    }
  }

  public isAdmin(): boolean {
    return this.authorities.some((authority, index, array): boolean => {
      return authority.authority === User.ADMIN_AUTHORITY_KEY;
    });
  }

  public getRestModel(): Object {
    let restUser: any = this._transformToPOJO('name', 'firstName');
    restUser.username = restUser.email = this.username;

    return restUser;
  }
}
