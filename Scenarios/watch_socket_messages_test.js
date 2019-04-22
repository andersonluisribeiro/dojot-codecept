Feature('Watch socket messages');

Before(login => {
    login('admin');
});

Scenario('Watching a simple message', async (I, Device) => {
   let template = await I.createTemplate({
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

    let device = await I.createDevice({
        "templates": [
            templateId
        ],
        "label": "String device"
    });

    let deviceId = device['devices'][0]['id'];

    I.refreshPage();
    Device.change64QtyToShowPagination();

    await I.sendMQTTMessage(deviceId, '{"text": "my string"}');

    Device.clickDetailsDevice(deviceId);
    Device.selectAttr('text');
    I.wait(5);
    Device.shouldSeeMessage('my string');

});
