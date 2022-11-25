import { LightService, LightServiceParameters as LightServiceParameters, ConcreteLightService, Attributes } from "./lightservice";

export class WhiteLightService extends LightService implements ConcreteLightService {
  constructor(parameters: LightServiceParameters) {
    super(parameters);
    this.service.displayName = "White Light";

    this.installHandlers();
  }

  private async installHandlers() {
    this.handleCharacteristic(
      this.platform.Characteristic.On,
      async () => {
        const attributes = await this.attributes();
        return attributes.power;
      },
      value => this.sendCommand("set_power", [value ? "on" : "off", "smooth", 500, 0]),
    );
  }

  public onAttributesUpdated = (newAttributes: Attributes) => {
    this.debug(`white light updated ${JSON.stringify(newAttributes)}`);
    this.updateCharacteristic(this.platform.Characteristic.On, newAttributes.power);
  };
}
