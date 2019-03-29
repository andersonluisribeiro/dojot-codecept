Feature('Template creation');

Before((login) => {
    login('admin');
});

Scenario('Creating a template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.change64QtyToShowPagination();
    Template.clickCreateNew();
    Template.fillNameTemplate('ATemp1');

    Template.addConfigTemplate(
        Template.ConfigurationType.protocol,
        'mqtt'
    );

    Template.addAttr(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMetaToAdd(
                'labelMeta1',
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
            Template.convertToObjectMetaToAdd(
                'labelMeta1',
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
            Template.convertToObjectMetaToAdd(
                'labelMeta2',
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
            Template.convertToObjectMetaToAdd(
                'labelMeta2',
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
            Template.convertToObjectMetaToAdd(
                'labelMeta2',
                'typeValueMeta2',
                Template.AttributeValueType.geo,
                '-11.2, -22'),

        ],
        5.5545
    );

    Template.addAttr(
        'actuator',
        Template.AttributeType.actuator,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMetaToAdd(
                'labelMeta3',
                'typeValueMeta3',
                Template.AttributeValueType.integer,
                10),

        ],
        'testActuator'
    );

    Template.clickSave();
    Template.seeTemplateHasCreated();
});

Scenario('Checking create template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.change64QtyToShowPagination();
    Template.clickCardByNameTemplate('ATemp1');
    Template.seeNameTemplate('ATemp1');
    Template.seeAttr(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMetaToAdd('labelMeta1',
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
    Template.change64QtyToShowPagination();
    Template.clickCardByNameTemplate('ATemp1');
    Template.seeNameTemplate('ATemp1');
    Template.fillNameTemplate('ATemp2');
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

    Template.updateAttr(
        'bool',
        'boolNew',
        Template.AttributeType.static,
        Template.AttributeValueType.boolean,
        [
            Template.convertToObjectMetaToRemove('labelMeta2'),
            Template.convertToObjectMetaToAdd(
                'labelMeta1',
                'Type',
                Template.AttributeValueType.boolean,
                false),
            Template.convertToObjectMetaToUpdate(
                'labelMeta1',
                'labelMeta2',
                'Type2',
                Template.AttributeValueType.integer,
                5),
        ],
        true
    );

    Template.removeAttr(
        'float',
        []
    );

    Template.seeManageFirmware();
    Template.clickSave();
    Template.seeTemplateHasUpdated();
});

Scenario('Checking update template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.change64QtyToShowPagination();
    Template.clickCardByNameTemplate('ATemp1');
    Template.seeNameTemplate('ATemp1');
    Template.seeAttr(
        'text',
        Template.AttributeType.static,
        Template.AttributeValueType.string,
        [
            Template.convertToObjectMetaToAdd('labelMeta1',
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

Scenario('Removing template', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.change64QtyToShowPagination();
    Template.clickCardByNameTemplate('ATemp2');
    Template.seeNameTemplate('ATemp2');
    Template.removeAttr('textNew', [
        Template.convertToObjectMetaToRemove('labelMeta2')
    ]);
    Template.removeConfigTemplate(Template.ConfigurationType.protocol);
    Template.removeTemplate();
    Template.seeTemplateHasDelete();
});
