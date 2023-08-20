# starlink-custom-card
Custom home assistant lovelace card showing status of starlink

To install the card, create a new folder in your "homeassistant/www/" directory called "starlink-card" and download the files to this directory. Then in Home Assistant go to Configuration - Lovelace Dashboards - Resources and click "Add Resource". Enter "/local/starlink-card/starlink-card.js" for the URL and "JavaScript Module" for the type and click create. Back in your main dashboard, you can now manually add the new card with the following code:

type: custom:starlink-card<br>
downlink: sensor.starlink_downlink_throughput<br>
uplink: sensor.starlink_uplink_throughput<br>
ping: sensor.starlink_ping<br>
ip: sensor.myip<br>
obstructed: binary_sensor.starlink_obstructed<br>
pingdrop: sensor.starlink_ping_drop_rate<br>
roaming: binary_sensor.starlink_roaming_mode<br>
stow: switch.starlink_stowed<br>


