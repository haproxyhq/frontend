import {RestWrapperModel}     from './rest-wrapper.model';
import {ConfigSection}        from './config-section.model';

export class Config extends RestWrapperModel {
  public config: Array<ConfigSection> = [];

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  protected transformPlainObject(plainObject :any): void {
    plainObject.config.forEach((configSection, index, array) => {
      this.config.push(new ConfigSection(configSection));
    });
  }

  public getRestModel(): Object {
    return this._transformToPOJO('config');
  }
}
