Feature('Watch socket messages');

Before(login => {
    login('admin');
});

Scenario('Watching a simple message', async (I, Device) => {
   let template = await I.postJSON('template', {
        label: "String Template",
        attrs: [
            {
            label: "text",
            type: "dynamic",
            value_type: "string"
            }
        ]
    });

    let templateId = template['template']['id'];

    let device = await I.postJSON('device', {
        "templates": [
            templateId
        ],
        "label": "String device"
    });
    
    let deviceId = device['devices'][0]['id'];

    I.refreshPage();

    await I.sendMQTTMessage(deviceId, '{"text": "my string"}');
    Device.editDevice(deviceId);
    Device.selectAttr('text');
    Device.shouldSeeMessage('my string');

});
