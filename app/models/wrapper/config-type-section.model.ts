export class ConfigTypeSection {
  constructor(public name: string, public type: string) {}

  public equals(configTypeSection: ConfigTypeSection): boolean {
    return this.name === configTypeSection.name && this.type === configTypeSection.type;
  }
}
