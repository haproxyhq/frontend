import {Link}     from './link.model';

/**
 * abstract base class for all models returned by the backend
 */
export abstract class RestWrapperModel {
  public links: Array<Link>;

  /**
   * returns the self link
   *
   * @returns {string} URL
   */
  public getSelfLink(): string {
    return this.links.find((link, index, array): boolean => {
      return link.rel === 'self';
    }).href;
  }

  /**
   * returns the rest model as plain javascript Object
   *
   * @returns {Object} POJO
   */
  public abstract getRestModel(): Object;

  /**
   * this method transforms a POJO returned by the backend to the wrapper Object
   *
   * @param {any} plainObject
   */
  public abstract transformPlainObject(plainObject: any): void;

  /**
   * transforms the given attributes of this object into a POJO
   *
   * @param {Array<string>} keys varargs
   * @returns {Object}
   */
  protected _transformToPOJO(...keys: Array<string>): Object {
    let restModel = {};
    this._swapValues(this, restModel, ...keys);

    return restModel;
  }

  /**
   * takes a POJO and a set of keys and adds the attributes of the POJO to this object
   *
   * @param {any} pojo
   * @param {Array<string>} keys varargs
   */
  protected _transformFromPOJO(pojo: any, ...keys: Array<string>): void {
    this._swapValues(pojo, this, ...keys);
  }

  /**
   * copies the elements with the given keys from the source to the target object
   *
   * @param {any} source object
   * @param {any} target object
   * @param {Array<string>} keys
   */
  private _swapValues(source: any, target: any, ...keys: Array<string>): void {
    keys.forEach(function(key: string) {
      target[key] = source[key];
    });
  }
}
