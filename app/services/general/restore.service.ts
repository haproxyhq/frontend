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

  /**
   * returns the original item
   *
   * @returns {T}
   */
  public getOriginalItem(): T {
    return this._originalItem;
  }

  /**
  * restores the original item. currentItem === originalItem
  * @returns this.getItem(): the original item
  **/
  public restoreItem() :T {
    this._currentItem = this._originalItem;
    return this.getItem();
  }

  /**
  * resets the restore service.
  * @returns currentItem: A new, deep copy of the original item
  **/
  public reset(): T {
    this._currentItem = this._clone(this._originalItem);
    return this.getItem();
  }

  private _clone(item: T) :T {
    return JSON.parse(JSON.stringify(item));
  }
}
