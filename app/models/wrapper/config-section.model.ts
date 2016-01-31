import {RestWrapperModel}     from './rest-wrapper.model';
import {ConfigTypeSection}    from './config-type-section.model';

export class ConfigSection {
  public section: ConfigTypeSection;
  public values: Array<String> = [];

  constructor(plainObject: any) {
    if (plainObject !== null) {
      this.section = new ConfigTypeSection(plainObject.section.name, plainObject.section.type);
      this.values = plainObject.values;
    } else {
      this.section = new ConfigTypeSection('','');
      this.values = [];
    }
  }

  public equals(configSection: ConfigSection): boolean {
    if(this.values.length !== configSection.values.length || !this.section.equals(configSection.section)) {
      return false;
    }

    for(var i = 0; i < this.values.length; i++) {
      if(this.values[i] !== configSection.values[i]) {
        return false;
      }
    }

    return true;
  }
}
