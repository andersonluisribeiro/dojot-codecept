var mqtt = require('async-mqtt')
var request = require('sync-request');
var env = require('../env.conf');

Feature('Watch socket messages');

Before(login => {
    login('admin');
});

Scenario('Watching a simple message', async (I) => {
    let jwt = await I.executeScript(() => { return localStorage.getItem('jwt')});

    let templateCreation = request('POST', `${env.dojot_host}/template`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: {
            label: "String Template",
            attrs: [
                {
                label: "text",
                type: "dynamic",
                value_type: "string"
                }
            ]
        }
    });
    
    let templateId = JSON.parse(templateCreation.getBody('utf8'))['template']['id'];

    let deviceCreation = request('POST', `${env.dojot_host}/device`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        json: {
            "templates": [
                templateId
            ],
            "label": "String device"
          }
    });

    I.refreshPage();
    
    let deviceId = JSON.parse(deviceCreation.getBody('utf8'))['devices'][0]['id'];

    let client  = mqtt.connect(env.mqtt_host);
    await client.publish(`/admin/${deviceId}/attrs`, '{"text": "my string"}');
    await client.end();
    I.click(locate('a').withAttr({ href: `#/device/id/${deviceId}/detail` }));
    I.click(locate('div').withAttr({ title: 'text' }));
    I.see('my string');
});
