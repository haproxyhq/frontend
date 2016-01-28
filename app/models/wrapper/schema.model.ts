import {RestWrapperModel} from './rest-wrapper.model';
import {Config}           from './config.model';
import {Link}             from './link.model';

/**
 * mode for wrapping schema entity objects
 */
export class Schema extends RestWrapperModel {
  public id: string;
  public name: string;
  public description: string;
  public version: string;
  public configHolder: Config = null;
  public links: Array<Link> = [];

  public constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  getRestModel(): Object {
    return this._transformToPOJO('name', 'description', 'version', 'configHolder');
  }

  protected transformPlainObject(plainObject: any): void {
    if (Object.keys(plainObject).length) {
      if (plainObject.configHolder !== null && plainObject.configHolder !== undefined) {
        this.configHolder = new Config(plainObject.configHolder);
      }
      this._transformFromPOJO(plainObject, 'id', 'name', 'description', 'version');

      plainObject.links.forEach((link, index, array) => {
        this.links.push(new Link(link.rel, link.href));
      });
    }
  }
}
