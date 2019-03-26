var mqtt = require('async-mqtt')

Feature('Realtime message');

Before(login => {
    login('admin');
});

Scenario('Sending a simple message', async (I) => {
    var client  = mqtt.connect('http://localhost');
    await client.publish('/admin/88d40f/attrs', '{"value": "my string"}');
    await client.end();
    I.click(locate('a').withAttr({ href: '#/device/id/88d40f/detail' }));
    I.click(locate('div').withAttr({ title: 'value' }));
    I.see('my string');
});
