import {Authority} from './authority.model';

export class User {
  private static ADMIN_AUTHORITY_KEY: string = 'ROLE_ADMIN';

  public username: string;
  public firstName: string;
  public name: string;
  public authorities: Array<Authority> = new Array<Authority>();

  constructor(plainUser: any) {
    this.username = plainUser.username;
    this.firstName = plainUser.firstName;
    this.name = plainUser.name;

    plainUser.authorities.forEach((authority, index, array) => {
      this.authorities.push(new Authority(authority.authority, authority.description, authority.name));
    });
  }

  public isAdmin(): boolean {
    this.authorities.forEach((authority, index, array) => {
      if (authority.authority === User.ADMIN_AUTHORITY_KEY) return true;
    });
    return false;
  }
}
