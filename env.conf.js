let env = {
    dojot_host: process.env.DOJOT_HOST || 'http://10.202.21.25:8000',
    mqtt_host: process.env.MQTT_HOST || 'http://10.202.21.25'
};

module.exports = env;