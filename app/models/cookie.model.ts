export class CookieModel {
  private _expiry: number = 30;
  private _path: string = '/';

  constructor() {}

  get expiry() { return this._expiry; }
  get path() { return this._path; }
}
