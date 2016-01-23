import {RestWrapperModel}     from './rest-wrapper.model';
import {ConfigSection}        from './config-section.model';

export class Config extends RestWrapperModel {
  public section: ConfigSection;
  public values: Array<String> = [];

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  protected transformPlainObject(plainObject :any): void {
    this.section = new ConfigSection(plainObject.section.name, plainObject.section.type);
    this.values = plainObject.values;
  }

  public getRestModel(): Object {
    return this._transformToPOJO('section', 'valus');
  }
}
