const mqtt = require('async-mqtt')
const request = require('sync-request');
const env = require('./env.conf');

module.exports = () => {
    let jwt;

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

        async postJSON(resource, myJson, method='POST'){
            if(!jwt){
                jwt = await this.executeScript(() => { return localStorage.getItem('jwt')});
            }

            let response = request(method, `${env.dojot_host}/${resource}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                json: myJson
            });

            return JSON.parse(response.getBody('utf8'));
        },

        async createTemplate(json){
            return await this.postJSON('template', json);
        },

        async updateTemplate(json, templateID){
            return await this.postJSON('template/'+templateID, json, 'PUT');
        },

        async createDevice(json){
            return await this.postJSON('device', json);
        },

        async clearDatabase(){
            return await this.postJSON('import', {
                "devices":[],"templates":[],"flows":[],"flowRemoteNodes":[]
            });
        },

        async setEnglishLanghage(){
            return await this.executeScript(() => { return localStorage.setItem("i18nextLng", "en")});
        },

        async sendMQTTMessage(deviceId, message){
            let client  = await mqtt.connect(env.mqtt_host);
            await client.publish(`/admin/${deviceId}/attrs`, message);
            await client.end();
        }

    });
};
