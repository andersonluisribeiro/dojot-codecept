Feature('Template creation');

Before((login) => {
    login('admin');
});
const templateName1 = 'Template 1';
const templateName2 = 'Template 2';

Scenario('Creating a device', async (I, Template) => {

    let template = await I.createTemplate({
        label: templateName1,
        attrs: [
            {
                label: "text",
                type: "dynamic",
                value_type: "string"
            },
            {
                label: "text",
                type: "dynamic",
                value_type: "integer"
            }
        ]
    });




});

