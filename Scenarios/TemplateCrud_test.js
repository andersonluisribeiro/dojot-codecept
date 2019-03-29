Feature('Template creation');

Before((login) => {
    login('admin');
});

Scenario('Creating a template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Temp1');

    Template.addConfigTemplate(
        Template.ConfigurationType.protocol,
        'mqtt'
    );

    Template.addAttr(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMeta('labelMeta1',
                'typeValueMeta1',
                Template.AttributeValueType.string,
                'valueMeta1')
        ],
        'value of text'
    );


    Template.addAttr(
        'int',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.integer,
        [
            Template.convertToObjectMeta('labelMeta1',
                'typeValueMeta1',
                Template.AttributeValueType.float,
                3.5)
        ]
    );

    Template.addAttr(
        'bool',
        Template.AttributeType.static,
        Template.AttributeValueType.boolean,
        [
            Template.convertToObjectMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.boolean,
                false),

        ],
        true
    );

    Template.addAttr(
        'gps',
        Template.AttributeType.static,
        Template.AttributeValueType.geo,
        [
            Template.convertToObjectMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.integer,
                55),

        ],
        '-22.826702502573774, -47.044628078647314'
    );

    Template.addAttr(
        'float',
        Template.AttributeType.static,
        Template.AttributeValueType.float,
        [
            Template.convertToObjectMeta('labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.geo,
                '-11.2, -22'),

        ],
        5.5545
    );

    Template.clickSave();
    Template.seeTemplateHasCreated();
});

Scenario('Checking create template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCardByNameTemplate('Temp1');
    Template.seeNameTemplate('Temp1');
    Template.seeAttr(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMeta('labelMeta1',
                'typeValueMeta1',
                Template.AttributeValueType.string,
                'valueMeta1')
        ],
        'value of text'
    );

    Template.seeConfigTemplate(
        Template.ConfigurationType.protocol,
        'mqtt'
    );

    Template.seeManageFirmware();
    Template.clickDiscard();
});

Scenario('Updating a template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCardByNameTemplate('Temp1');
    Template.seeNameTemplate('Temp1');
    Template.fillNameTemplate('Temp2');
    Template.updateAttr(
        'text',
        'textNew',
        Template.AttributeType.static,
        Template.AttributeValueType.integer,
        [
            Template.convertToObjectMetaToUpdate(
                'labelMeta1',
                'labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.boolean,
                false)
        ],
        10
    );
    Template.seeManageFirmware();
    Template.clickSave();
    Template.seeTemplateHasUpdated();
});

Scenario('Removing template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCardByNameTemplate('Temp2');
    Template.seeNameTemplate('Temp2');
    Template.removeAttr('textNew', [
        'labelMeta2'
    ]);
    Template.removeConfigTemplate(Template.ConfigurationType.protocol);
    Template.removeTemplate();
    Template.seeTemplateHasDelete();
});
