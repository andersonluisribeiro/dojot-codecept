let I = actor();
const Util = require('../Utils');

module.exports = {

    AttributeTypes: {
        configuration: 'Configuration',
        dynamic: 'Dynamic Attributes',
        static: 'Static Values',
        actuator: 'Actuators',
    },
    ConfigurationType: {
        protocol: 'Protocol',
        topic: 'Topic',
        translator: 'Translator',
        device_timeout: 'Device Timeout',
    },
    AttributeValueType: {
        boolean: 'Boolean',
        geo: 'Geo',
        float: 'Float',
        integer: 'Integer',
        string: 'String',
    },

    init(i) {
        I = i;
    },

    clickOpenDevicePage: function () {
        I.waitForElement(locate('a').withAttr({href: '#/device'}));
        I.click(locate('a').withAttr({href: '#/device'}));
    },

    clickCreateNew: function () {
        I.waitForElement(locate('div').withAttr({title: 'Create a new device'}));
        I.click(locate('div').withAttr({title: 'Create a new device'}));
    },

    fillNameDevice: function (value) {
        I.fillField('name', value);
    },

    clickAddOrRemoveTemplate() {
        I.click(locate('.add-template-button'));
    },

    clickToSelectTemplate(templateName) {
        I.click(locate('.template-item').withAttr({title: templateName}));
    },

    clickToManageAttributes(attributeType) {
        //.sidebar-button role=button title
        I.click(locate('.sidebar-button').withAttr({title: attributeType, role: 'button'}));
    },

    seeAllConfigurations(arrayConfigurations) {
        arrayConfigurations.forEach(config => {
            I.seeElement(locate('input').withAttr({value: Util.toString(config.static_value)}).before(locate('label').withText(config.label)));
        });
    },

    seeAllStatic(arrayStatics) {
        arrayStatics.forEach(attr => {
            I.seeElement(locate('input').withAttr({value: Util.toString(attr.static_value)}).before(locate('label').withText(attr.label)));
            this._seeMetas(attr);
        });
    },

    _seeMetas: function (attr) {
        I.seeElement(locate('.attr-card-input-wrapper div').withText(attr.label));
        I.click(locate('.attr-card-metadata-arrow').withAttr({
            id: 'meta_show:' + attr.label,
            role: 'button'
        }));
        within(locate('.attr-card-metadata-body').withAttr({id: 'meta_data:' + attr.label}), () => {
            attr.metas.forEach(meta => {
                I.seeElement(locate('label').withText(`${meta.label} (${meta.type})`));
                I.seeElement(locate('input').withAttr({name: meta.label, value: Util.toString(meta.static_value)}));
                I.seeElement(locate('.attr-card-type').withText(meta.value_type));
            });
        });
    },

    seeAllDynamics(arrayAttrs) {
        arrayAttrs.forEach(attr => {

            within(locate('.attr-card-input-wrapper').withAttr({id: `label:${attr.label}`}), () => {
                I.seeElement(locate('div').withText(attr.label));
                I.seeElement(locate('div').withText(attr.type));
            });

            this._seeMetas(attr);
        });
    },

    _fillStaticValue: function (label, newValue) {
        I.fillField(locate('input').before(locate('label').withText(label)), newValue);
        this.clickSave();
    },
    fillAttrStaticValue(label, newValue) {
        this.clickToManageAttributes(this.AttributeTypes.static);
        this._fillStaticValue(label, newValue);
    },
    fillConfigurationValue(label, newValue) {
        this.clickToManageAttributes(this.AttributeTypes.configuration);
        this._fillStaticValue(label, newValue);
    },
    _fillMetaValue: function (labelAttr, labelMeta, newValueMeta) {
        I.click(locate('.attr-card-metadata-arrow').withAttr({
            id: 'meta_show:' + labelAttr,
            role: 'button'
        }));
        within(locate('.attr-card-metadata-body').withAttr({id: 'meta_data:' + labelAttr}), () => {
            I.fillField(locate('input').withAttr({name: labelMeta}), Util.toString(newValueMeta));
        });
        this.clickSave();
    },
    fillMetaStaticValue(labelAttr, labelMeta, newValueMeta){
        this.clickToManageAttributes(this.AttributeTypes.static);
        this._fillMetaValue(labelAttr, labelMeta, newValueMeta);
    },
    fillMetaDynamicValue(labelAttr, labelMeta, newValueMeta){
        this.clickToManageAttributes(this.AttributeTypes.dynamic);
        this._fillMetaValue(labelAttr, labelMeta, newValueMeta);
    },
    clickDiscard() {
        I.click('Discard');
    },

    clickBack() {
        I.click('Back');
    },

    clickSave() {
        I.click('Save');
    },

    openDevicesPage(){
        I.click(locate('a').withAttr({ href: `#/device` }));
    },

    editDevice(deviceId) {
        I.click(locate('a').withAttr({href: `#/device/id/${deviceId}/detail`}));
    },

    selectAttr(attr){
        I.click(locate('div').withAttr({ title: attr }));
    },

    selectAttrWithCallback(attr, callback){
        I.click(locate('div').withAttr({ title: attr })).then(callback);
    },

    async selectAttrSync(attr){
        await I.click(locate('div').withAttr({ title: attr }));
    },

    shouldSeeMessage(message) {
        I.see(message);
    },

    change64QtyToShowPagination(){
        I.selectOption(locate('select').inside('.card-select-2'), '64');
    },
    seeHasCreated: function () {
        I.wait(3);
        I.see('Device created.');
    },

}
