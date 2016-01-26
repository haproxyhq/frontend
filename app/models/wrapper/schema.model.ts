import {RestWrapperModel} from './rest-wrapper.model';
import {Config} from './config.model';

/**
 * mode for wrapping schema entity objects
 */
export class Schema extends RestWrapperModel {
  public name: string;
  public description: string;
  public configHolder: Config;

  public constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  getRestModel(): Object {
    return this._transformToPOJO('name', 'description', 'configHolder');
  }

  protected transformPlainObject(plainObject: any): void {
    if (plainObject.configHolder !== null && plainObject.configHolder !== undefined) {
      this.configHolder = new Config(plainObject.configHolder);
    }
    this._transformFromPOJO(plainObject, 'name', 'description');
  }
}
