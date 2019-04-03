Feature('Device CRUD');

Before((login) => {
    login('admin');
});
const templateName1 = '1 - Template';
const templateName2 = '2 - Template';

Scenario('Creating a device', async (I, Device) => {

    await I.createTemplate({
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
    });
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

    Device.fillAttrStaticValue('serial', 'ABCDEFG-86');
    Device.fillConfigurationValue(Device.ConfigurationType.protocol, 'mqtt2');
    Device.fillMetaStaticValue('serial','meta1', 22);
    Device.fillMetaDynamicValue('float', 'unit', '40');
    Device.clickSave();
});

