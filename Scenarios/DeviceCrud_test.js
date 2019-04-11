Feature('Device CRUD');

Before((login) => {
    login('admin');
});

let template1 = {
    id: null,
    name: '1 - Template',
    attrsDynamics: [
        {
            value_type: 'boolean',
            label: 'bool',
            type: 'dynamic',
        },
        {
            value_type: 'float',
            label: 'float',
            type: 'dynamic',
            metadata: [
                {
                    label: "unit",
                    static_value: "empty",
                    type: "temperature",
                    value_type: "string"
                }
            ],
        },
        {
            value_type: 'geo:point',
            label: 'gps',
            type: 'dynamic',
        },
        {
            value_type: 'integer',
            label: 'int',
            type: 'dynamic',
        },
        {
            value_type: 'string',
            label: 'str',
            type: 'dynamic',
        }],
    attrsStatics: [
        {
            value_type: 'string',
            label: 'serial',
            type: 'static',
            static_value: 'undefined',
            metadata: [
                {
                    label: "meta1",
                    static_value: 10,
                    type: "type_meta",
                    value_type: "integer"
                },
                {
                    label: "meta2",
                    static_value: "value",
                    type: "type_string_x",
                    value_type: "string"
                }
            ],
        },
        {
            value_type: 'string',
            label: 'str_static',
            type: 'static',
            static_value: 'undefined',
        }
    ],
    attrsConfig: [
        {
            value_type: 'string',
            label: 'protocol',
            type: 'meta',
            static_value: 'mqtt'
        }
    ],
    attrsActuators: [
        {
            value_type: 'string',
            label: 'msg',
            type: 'actuator',
            static_value: ''
        }
    ],
    json: {}
};

const loadJson = () => {
    template1.json = {
        label: template1.name,
        attrs: [
            ...template1.attrsActuators,
            ...template1.attrsConfig,
            ...template1.attrsStatics,
            ...template1.attrsDynamics,
        ]
    }
};
loadJson();

function checkingAttrTemplate(Device, template) {
    Device.clickToManageAttributes(Device.AttributeTypes.configuration);
    Device.seeAllConfigurations(template.attrsConfig);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.dynamic);
    Device.seeAllDynamics(template.attrsDynamics);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.static);
    Device.seeAllStatic(template.attrsStatics);
    Device.clickDiscard();
}

Scenario('Creating a device', async (I, Device) => {

    const template = await I.createTemplate(template1.json);
    template1.id = template['template']['id'];

    Device.init(I);
    Device.clickOpenDevicePage();
    Device.change64QtyToShowPagination();

    I.refreshPage();

    Device.clickCreateNew();
    Device.fillNameDevice('Name of device');
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate(template1.name);
    Device.clickBack();

    checkingAttrTemplate(Device, template1);

    Device.fillAttrStaticValue('serial', 'ABCDEFG-86');
    Device.fillConfigurationValue(Device.ConfigurationType.protocol, 'mqtt2');
    Device.fillMetaStaticValue('serial', 'meta1', 22);
    Device.fillMetaDynamicValue('float', 'unit', '40');
    Device.clickSave();

    Device.seeHasCreated();
});

Scenario('Checking a device create', async (I, Device) => {

    Device.init(I);
    Device.change64QtyToShowPagination();
    Device.clickCardByDeviceName('Name of device');

    const templateJustToCheck = JSON.parse(JSON.stringify(template1));
    templateJustToCheck.attrsStatics[0].static_value = 'ABCDEFG-86';
    templateJustToCheck.attrsConfig[0].static_value = 'mqtt2';
    templateJustToCheck.attrsStatics[0].metadata[0].static_value = 22;
    templateJustToCheck.attrsDynamics[1].metadata[0].static_value = '40';
    checkingAttrTemplate(Device, templateJustToCheck);

    Device.clickDiscard();

});

Scenario('Updating a device', async (I, Device) => {

    Device.init(I);
    Device.change64QtyToShowPagination();
    Device.clickCardByDeviceName('Name of device');
    Device.fillNameDevice('Name of device charge');

    Device.fillAttrStaticValue('serial', 'change-ABCDEFG-86');
    Device.fillConfigurationValue(Device.ConfigurationType.protocol, 'mqtt');
    Device.fillMetaStaticValue('serial', 'meta1', 10);
    Device.fillMetaDynamicValue('float', 'unit', '11');

    Device.clickSave();

    Device.seeHasUpdated();

});

Scenario('Checking a device update', async (I, Device) => {

    Device.init(I);
    Device.change64QtyToShowPagination();
    Device.clickCardByDeviceName('Name of device charge');

    const templateJustToCheck = JSON.parse(JSON.stringify(template1));
    templateJustToCheck.attrsStatics[0].static_value = 'change-ABCDEFG-86';
    templateJustToCheck.attrsConfig[0].static_value = 'mqtt';
    templateJustToCheck.attrsStatics[0].metadata[0].static_value = 10;
    templateJustToCheck.attrsDynamics[1].metadata[0].static_value = '11';
    checkingAttrTemplate(Device, templateJustToCheck);

    Device.clickDiscard();

});


Scenario('Checking a after change template', async (I, Device) => {

    //str_static
    template1.attrsStatics[1].static_value = 'updateValueWithoutEditOnDevice';

    //attr serial
    template1.attrsStatics[0].static_value = 'updateValueWithEditOnDevice';
    //meta1
    template1.attrsStatics[0].metadata[0].static_value = 33;
    //meta2
    template1.attrsStatics[0].metadata[1].static_value = 'updateValueWithoutEditOnDevice';

    await I.updateTemplate(template1.json, template1.id);

    const templateJustToCheck = JSON.parse(JSON.stringify(template1));
    templateJustToCheck.attrsStatics[0].static_value = 'change-ABCDEFG-86';
    templateJustToCheck.attrsConfig[0].static_value = 'mqtt';
    templateJustToCheck.attrsStatics[0].metadata[0].static_value = 10;
    templateJustToCheck.attrsDynamics[1].metadata[0].static_value = '11';

    Device.init(I);
    Device.change64QtyToShowPagination();
    Device.clickCardByDeviceName('Name of device charge');

    checkingAttrTemplate(Device, templateJustToCheck);

    Device.clickDiscard();

});


Scenario('Removing a device', async (I, Device) => {
    Device.init(I);
    Device.change64QtyToShowPagination();
    Device.clickCardByDeviceName('Name of device charge');
    Device.clickRemove();
    Device.clickConfirm();
    Device.seeHasRemoved();
});

