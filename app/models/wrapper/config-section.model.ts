import {RestWrapperModel}     from './rest-wrapper.model';
import {ConfigTypeSection}    from './config-type-section.model';

export class ConfigSection {
  public section: ConfigTypeSection;
  public values: Array<String> = [];

  constructor(plainObject: any) {
    this.section = new ConfigTypeSection(plainObject.section.name, plainObject.section.type);
    this.values = plainObject.values;
  }
}
