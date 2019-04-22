Feature('Flow creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple flow', async (I, Flow, Device, Notification) => {
    Flow.init(I);

    const deviceId = await Flow.createDevice();

    Flow.clickOpen();
    Flow.clickCreateNew();
    Flow.setFlowName('my flow');

    Flow.addDeviceInput();
    Flow.addSwitch();
    Flow.addChange();
    Flow.addDeviceOutput();
    // Flow.addNotification();

    await Flow.connectFlows();

    Flow.clickOnDeviceInput();
    Flow.editDeviceInputName()
    Flow.selectDevice(deviceId);
    Flow.clickOnDone();

    Flow.clickOnSwitch();
    Flow.editSwitchProperty();
    Flow.editSwitchCondition();
    Flow.clickOnDone();

    Flow.clickOnChange();
    Flow.editChangeProperty();
    Flow.editChangePropertyValue();
    Flow.clickOnDone();

    Flow.clickOnDeviceOutput();
    Flow.editDeviceOutputSource();
    Flow.clickOnDone();

    // Flow.clickOnNotificationInput();
    // Flow.editMessageType();
    // Flow.editMessageDynamicValue();
    // Flow.editMessageInputSource();
    // Flow.clickOnDone();

    Flow.clickOnSave();
    Flow.seeFlowHasCreated();

    Device.openDevicesPage();
    Device.change64QtyToShowPagination();
    Device.clickDetailsDevice(deviceId);
    Device.selectAttr('input');

    await Device.selectAttrSync('output');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(5);

    Device.shouldSeeMessage('output value');

    // await Notification.openNotificationsPage();
    // const totalBefore = await Notification.totalOfMessagesWithText('output value');
    // await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    // I.wait(5);

    // await Notification.shouldISeeMessagesWithText('output value', totalBefore + 1);

});
