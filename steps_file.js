var mqtt = require('async-mqtt')
var request = require('sync-request');
var env = require('./env.conf');

module.exports = function () {
    return actor({

        seeInputByNameAndValue: function (name, value) {
            this.seeElement(locate('input').withAttr({name, value}));
        },

        seeSelectOptionByNameAndValue: function (name, value) {
            this.seeElement(locate('select').withAttr({name}), value);
        },

        fillSelectByName(name, value){
            this.selectOption(locate('select').withAttr({name}), value);
        },

        async postJSON(resource, myJson){ 
            let jwt = await this.executeScript(() => { return localStorage.getItem('jwt')});

            let response = request('POST', `${env.dojot_host}/${resource}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                json: myJson
            });

            return JSON.parse(response.getBody('utf8'));
        },

        async createTemplate(json){
            return this.postJSON('template', json);
        },

        async createDevice(json){
            return this.postJSON('device', json);
        },

        async sendMQTTMessage(deviceId, message){
            let client  = mqtt.connect(env.mqtt_host);
            await client.publish(`/admin/${deviceId}/attrs`, message);
            await client.end();
        }

    });
};
