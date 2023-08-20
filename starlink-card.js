class StarlinkCard extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
       <ha-card>
          <div class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector('div');
    }

    const downlink = this.config.downlink;
    const down = hass.states[downlink].state;
    const downRound = Number(down).toFixed(2);
    const downlink_str = downRound ? downRound : 'unavailable';

    const uplink = this.config.uplink;
    const up = hass.states[uplink].state;
    const upRound = Number(up).toFixed(2);
    const uplink_str = upRound ? upRound : 'unavailable';

    const ping = this.config.ping;
    const pingRound = Math.round(Number(hass.states[ping].state));
    const ping_str = pingRound ? pingRound : 'unavailable';

    const ip = this.config.ip;
    const ip_str = hass.states[ip].state;

    const obstructed = this.config.obstructed;
    const obstructed_str = hass.states[obstructed].state;
    if (obstructed_str == "off") {
      var obstructed_str1 = "No Obstructions";
    } else {
      var obstructed_str1 = "Obstructed";
    }
    const pingDrop = this.config.pingdrop;
    const pingDrop_str = Number(hass.states[pingDrop].state).toFixed(1);

    const roaming = this.config.roaming;
    const roaming_str = hass.states[roaming].state;
    if (roaming_str == "off") {
      var roaming_str1 = "Not Roaming";
    } else {
      var roaming_str1 = "Roaming";
    }


    const stow = this.config.stow;
    const stow_state = hass.states[stow].state;
    const stow_entity = hass.states[stow].entity_id;
    const stow_str = stow_state === "off" ? "Not Stowed" : "Stowed";

    const handleSwitchChange = (event) => {
      const newState = event.target.checked ? "on" : "off";
      console.log(stow_entity, newState);
      hass.callService("switch", "turn_" + newState, {
        entity_id: stow_entity
      });
    };
    
    this.content.innerHTML = `
    <row style="display: flex">
    <div style="flex: 100%;text-align: center;position: relative;">
      <img src="/local/starlink-card/img/background.png" style="max-width:100%">
      <h3 style="position: absolute;top: 10px;left: 10%; font-size:15px">${downlink_str} Mbits/s Down</h3>
      <h3 style="position: absolute;top: 30px;left: 10%; font-size:15px">${uplink_str} Mbits/s Up</h3>
      <h3 style="position: absolute;top: 50px;left: 10%; font-size:15px">${ping_str} ms Ping</h3>
      <h3 style="position: absolute;top: 130px;left: 65%; font-size:15px">${ip_str}</h3>
      <h3 style="position: absolute;top: 150px;left: 65%; font-size:15px">${pingDrop_str}% Dropped</h3>
      <h3 style="position: absolute;top: 170px;left: 65%; font-size:15px">${obstructed_str1}</h3>
      <h3 style="position: absolute;top: 190px;left: 65%; font-size:15px">${roaming_str1}</h3>
      <h3 style="position: absolute;top: 290px;left: 55%; font-size:15px">${stow_str}</h3>
      <ha-switch style="position: absolute;top: 310px;left: 75%; display:none" .checked="${stow_state === 'on'}" .entityId="${stow_entity}" @change="${handleSwitchChange}"></ha-switch>
    </div>
  </row>  
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('starlink-card', StarlinkCard);

