Feature('Template creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple template', async (I, Template) => {
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Temp1');
    Template.addAttrTemplate(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.setMeta('labelMeta1',
                'typeValueMeta1',
                Template.AttributeValueType.string,
                'valueMeta1')
        ],
        'value of text');

    Template.addAttrTemplate(
        'int',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.integer,
        [
            Template.setMeta('labelMeta1',
                'typeValueMeta1',
                Template.AttributeValueType.float,
                3.5)
        ]);

    Template.addAttrTemplate(
        'bool',
        Template.AttributeType.static,
        Template.AttributeValueType.boolean,
        [
            Template.setMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.boolean,
                false),

        ],
        true);

    Template.addAttrTemplate(
        'gps',
        Template.AttributeType.static,
        Template.AttributeValueType.geo,
        [
            Template.setMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.integer,
                55),

        ],
        '-22.826702502573774, -47.044628078647314');

    Template.addAttrTemplate(
        'float',
        Template.AttributeType.static,
        Template.AttributeValueType.float,
        [
            Template.setMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.geo,
                '-11.2, -22'),

        ],
        5.5545);

    Template.clickSave();
    Template.seeTemplateHasCreated();
});
