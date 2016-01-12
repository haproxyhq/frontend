import {Authority} from './authority.model';
import {Link} from './link.model';

export class User {
  private static ADMIN_AUTHORITY_KEY: string = 'ROLE_ADMIN';

  public username: string;
  public firstName: string;
  public name: string;
  public authorities: Array<Authority> = new Array<Authority>();
  public links: Array<Link> = new Array<Link>();

  constructor(plainUser: any) {
    this.username = plainUser.username;
    this.firstName = plainUser.firstName;
    this.name = plainUser.name;

    plainUser.authorities.forEach((authority, index, array) => {
      this.authorities.push(new Authority(authority.authority, authority.description, authority.name));
    });

    plainUser.links.forEach((link, index, array) => {
      this.links.push(new Link(link.rel, link.href));
    });
  }

  public isAdmin(): boolean {
    return this.authorities.some((authority, index, array): boolean => {
      return authority.authority === User.ADMIN_AUTHORITY_KEY;
    });
  }

  public getSelfLink(): string {
    return this.links.find((link, index, array): boolean => {
      return link.rel === 'self';
    }).href;
  }

  public getRestModel(): Object {
    let restUser: any = {};
    restUser.firstName = this.firstName;
    restUser.name = this.name;
    restUser.email = this.username;
    return restUser;
  }
}
