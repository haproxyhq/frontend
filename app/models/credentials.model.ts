export class Credentials {
  public username: string;
  public password: string;

  constructor();
  constructor(username?: string, password?: string) {
    this.username = username || '';
    this.password = password || '';
  }

}
