import {Injectable}   from 'angular2/core';

@Injectable()
export class RestoreService<T> {
  private _originalItem: T;
  private _currentItem: T;

  public setItem(item: T) {
    this._originalItem = item;
    this._currentItem = this._clone(item);
  }

  public getItem() :T {
    return this._currentItem;
  }

  public restoreItem() :T {
    this._currentItem = this._originalItem;
    return this.getItem();
  }

  private _clone(item: T) :T {
    return JSON.parse(JSON.stringify(item));
  }
}
