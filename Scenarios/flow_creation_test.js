Feature('Flow creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple flow', async (I, Flow, Template) => {
    I = Flow;

    await I.createADevice();
    I.clickOpen();
    I.clickCreateNew();
    I.setFlowName('my flow');
    I.addDeviceInput();
    I.addSwitch();
    I.addChange();
    I.addDeviceOutput();
    I.addNotification();
    await I.connectFlows();
    I.editDeviceInput();
    // I.clickOnSave();
    // I.seeFlowHasCreated();

});
