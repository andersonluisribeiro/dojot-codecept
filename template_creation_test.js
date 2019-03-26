
Feature('Template creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple template', async (I) => {
    I.click('Templates');
    I.click(locate('div').withAttr({ title: 'Create a new template' }));
    I.fillField('Template Name', 'Custom template');
    I.click(locate('.body-actions--button').first());
    within('.sidebar-attribute', () => {
        I.fillField(locate('input').first(), 'temperature');
        I.selectOption(locate('select').withAttr({ name: 'type' }), 'Dynamic Value');
        I.selectOption(locate('select').withAttr({ name: 'value_type' }), 'Integer');
        I.click('add');
    });
    I.click('add');
    I.see('Custom template');
});
