export class MqttBroker {
  public host: string;
  public topicPrefix: string;
  public clientId: string;

  constructor(plainObject: any) {
    this.host = plainObject.host;
    this.topicPrefix = plainObject.topicPrefix;
    this.clientId = plainObject.clientId;
  }
}
