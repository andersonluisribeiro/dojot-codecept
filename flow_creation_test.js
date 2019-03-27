Feature('Flow creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple flow', async (I, FlowPage) => {
    FlowPage.clickOpen();
    FlowPage.clickCreateNew();
    FlowPage.addDeviceToFlow();
    FlowPage.addChangeToFlow();
    FlowPage.addHttpToFlow();
    FlowPage.connectFlows();
});
