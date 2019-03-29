Feature('Flow creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple flow', async (I, FlowPage) => {
    I = FlowPage;

    I.clickOpen();
    I.clickCreateNew();
    I.setFlowName('my flow');
    I.addDeviceToFlow();
    I.addChangeToFlow();
    I.addHttpToFlow();
    await I.connectFlows();
    I.clickOnSave();
    I.seeFlowHasCreated();
});
