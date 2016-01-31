export class AgentConfig {
  COMMENT_SEC_1 = '';
  SERVER_ADDRESS = '';
  SERVER_PORT = '';
  SERVER_API_ENDPOINT = '';
  COMMENT_SEC_2 = '';
  AGENT_ID = '';
  AGENT_TOKEN = '';
  COMMENT_SEC_3 = '';
  MQTT_BROKER_ADRESS = '';
  MQTT_BROKER_PORT = '';
  COMMENT_SEC_4 = '';
  HA_PROXY_CONFIG_PATH = '';
  COMMENT_SEC_5 = '';
  MQTT_TOPIC = '';
  COMMENT_SEC_6 = '';
  SERVER_URL = '';

  constructor() {
    this.COMMENT_SEC_1 = '# the url and port of the server the HAProxyHQ is running on and the API endpoint for the config';
    this.SERVER_ADDRESS = '\'\'';
    this.SERVER_PORT = '\'80\'';
    this.SERVER_API_ENDPOINT = '\'agents\'';

    this.COMMENT_SEC_2 = '# the ID of this agent and it\'s token, which the HAProxyHQ will need to identify and authenticate this agent';
    this.AGENT_ID = '\'\'';
    this.AGENT_TOKEN = '\'\'';

    this.COMMENT_SEC_3 = '# the adress and port of the MQTT broker';
    this.MQTT_BROKER_ADRESS = '\'\'';
    this.MQTT_BROKER_PORT = '\'1883\'';

    this.COMMENT_SEC_4 = '# the path of the HAProxy config, which the agent will manage';
    this.HA_PROXY_CONFIG_PATH = '\'/etc/haproxy/haproxy.cfg\'';

    this.COMMENT_SEC_5 = '# the MQTT topic the agent will subscribe to. There should be no need to change this!';
    this.MQTT_TOPIC = '\'/haproxyhq/agents/\' + AGENT_ID';

    this.COMMENT_SEC_6 = '# complete URL. There should be no need to change this!';
    this.SERVER_URL = 'SERVER_ADDRESS + \':\' + SERVER_PORT + \'/\' + SERVER_API_ENDPOINT + \'/\' + AGENT_ID + \'/\'';
  }

  public getStringifiedConfig(): string {
    let output = '';
    for (var key in this) {
      if (!key.startsWith('getStringifiedConfig')) {
        if (!key.startsWith('COMMENT_SEC_')) {
          output += key + ' = ' + this[key] + '\n';
        } else {
          output += '\n' + this[key] + '\n';
        }
      }
    }
    return output;
  }

}
