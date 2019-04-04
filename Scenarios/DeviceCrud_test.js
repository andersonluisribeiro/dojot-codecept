Feature('Device CRUD');

Before((login) => {
    login('admin');
});
const templateName1 = '1 - Template';
let templateId1 = null;

const templateName2 = '2 - Template';
const json = {
    label: templateName1,
    attrs: [
        {
            value_type: 'string',
            label: 'msg',
            type: 'actuator',
            static_value: ''
        },
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
                    static_value: "undefined",
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
        },
        {
            value_type: 'string',
            label: 'protocol',
            type: 'meta',
            static_value: 'mqtt'
        },
        {
            value_type: 'string',
            label: 'str_static',
            type: 'static',
            static_value: 'undefined',
        },
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
        }
    ]
};
Scenario('Creating a device', async (I, Device) => {

    const template = await I.createTemplate(json);
    templateId1 = template['template']['id'];

    Device.init(I);
    Device.clickOpenDevicePage();
    Device.change64QtyToShowPagination();

    I.refreshPage();

    Device.clickCreateNew();
    Device.fillNameDevice('Name of device');
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate(templateName1);
    Device.clickBack();

    Device.clickToManageAttributes(Device.AttributeTypes.configuration);
    Device.seeAllConfigurations([
        {
            label: Device.ConfigurationType.protocol,
            static_value: 'mqtt'
        }
    ]);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.dynamic);
    Device.seeAllDynamics([
        {
            label: 'float',
            type: Device.AttributeValueType.float,
            metas: [
                {
                    label: "unit",
                    static_value: "undefined",
                    type: "temperature",
                    value_type: "string"
                }
            ]
        }
    ]);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.static);
    Device.seeAllStatic([
        {
            label: 'serial',
            type: Device.AttributeValueType.string,
            metas: [
                {
                    label: "meta1",
                    static_value: 10,
                    type: "type_meta",
                    value_type: "integer"
                }
            ],
            static_value: 'undefined'
        }
    ]);
    Device.clickDiscard();

    ///see for actuator based on Dynamics

    Device.fillAttrStaticValue('serial', 'ABCDEFG-86');
    Device.fillConfigurationValue(Device.ConfigurationType.protocol, 'mqtt2');
    Device.fillMetaStaticValue('serial','meta1', 22);
    Device.fillMetaDynamicValue('float', 'unit', '40');
    Device.clickSave();
    Device.seeHasCreated();
});

Scenario('Updating a device (with update into template)', async (I, Device) => {

    json.attrs[7].static_value = 'updateValueWithoutEditOnDevice';
    json.attrs[8].metadata[0].static_value = 'updateValueWithEditOnDevice';
    json.attrs[8].metadata[1].static_value = 'updateValueWithoutEditOnDevice';
    json.attrs[8].static_value = 'updateValueWithEditOnDevice';

    //await I.updateTemplate(json, templateId1);

    /*Device.init(I);
    Device.clickOpenDevicePage();
    Device.change64QtyToShowPagination();

    I.refreshPage();

    Device.clickCreateNew();
    Device.fillNameDevice('Name of device');
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate(templateName1);
    Device.clickBack();

    Device.clickToManageAttributes(Device.AttributeTypes.configuration);
    Device.seeAllConfigurations([
        {
            label: Device.ConfigurationType.protocol,
            static_value: 'mqtt'
        }
    ]);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.dynamic);
    Device.seeAllDynamics([
        {
            label: 'float',
            type: Device.AttributeValueType.float,
            metas: [
                {
                    label: "unit",
                    static_value: "undefined",
                    type: "temperature",
                    value_type: "string"
                }
            ]
        }
    ]);
    Device.clickDiscard();

    Device.clickToManageAttributes(Device.AttributeTypes.static);
    Device.seeAllStatic([
        {
            label: 'serial',
            type: Device.AttributeValueType.string,
            metas: [
                {
                    label: "meta1",
                    static_value: 10,
                    type: "type_meta",
                    value_type: "integer"
                }
            ],
            static_value: 'undefined'
        }
    ]);
    Device.clickDiscard();

    ///create for actuator based on Dynamics

    Device.fillAttrStaticValue('serial', 'ABCDEFG-86');
    Device.fillConfigurationValue(Device.ConfigurationType.protocol, 'mqtt2');
    Device.fillMetaStaticValue('serial','meta1', 22);
    Device.fillMetaDynamicValue('float', 'unit', '40');
    Device.clickSave();*/
});

