import {RestWrapperModel} from './rest-wrapper.model';
import {Link} from './link.model';

export class Group extends RestWrapperModel {
  public name: string;
  public description: string;
  public authority: string;

  public constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);

    if(plainObject.links) {
      plainObject.links.forEach((link, index, array) => {
        this.links.push(new Link(link.rel, link.href));
      });
    }
  }

  getRestModel(): Object {
    return this._transformToPOJO('name', 'description', 'authority');
  }

  protected transformPlainObject(plainObject: any): void {
    this._transformFromPOJO(plainObject, 'name', 'description', 'authority');
  }
}
