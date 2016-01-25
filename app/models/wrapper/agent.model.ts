import {RestWrapperModel} from './rest-wrapper.model';
import {Config}           from './config.model';

/**
 * this model wraps the data for a Agent returned by the backend
 */
export class Agent extends RestWrapperModel {
  public id: string;
  public name: string;
  public description: string;
  public ip: string;
  public version: string;
  public configHolder: Config = null;

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  protected transformPlainObject(plainObject :any): void {
    if (Object.keys(plainObject).length) {
      if (plainObject.configHolder !== null && plainObject.configHolder !== undefined) {
        this.configHolder = new Config(plainObject.configHolder);
      }
      this._transformFromPOJO(plainObject, 'id', 'name', 'description', 'ip', 'version');
    }
  }

  public getRestModel(): Object {
    return this._transformToPOJO('name', 'description', 'ip', 'version');
  }
}
