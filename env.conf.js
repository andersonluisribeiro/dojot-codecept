let env = {
    dojot_host: process.env.DOJOT_HOST || 'http://localhost:8000',
    mqtt_host: process.env.MQTT_HOST || 'http://localhost'
};

module.exports = env;
