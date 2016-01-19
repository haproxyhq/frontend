import {RestWrapperModel} from './rest-wrapper.model';

/**
 * this model wraps the data for a Agent returned by the backend
 */
export class Agent extends RestWrapperModel {
  public name: string;
  public description: string;
  public ip: string;
  public version: string;

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  protected transformPlainObject(plainObject :any): void {
    return this._transformFromPOJO(plainObject, 'name', 'description', 'ip', 'version');
  }

  public getRestModel(): Object {
    return this._transformToPOJO('name', 'description', 'ip', 'version');
  }

}
