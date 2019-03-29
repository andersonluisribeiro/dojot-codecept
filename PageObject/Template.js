let I = actor();
const Util = require('../Utils');

module.exports = {
    FieldsLabel:{},
    ButtonLabel: {
        add: 'Add',
        remove: 'Remove',
        save: 'Save',
        discard: 'Discard'
    },
    ClassesCSS:{},
    AttributeType: {
        dynamic: 'Dynamic Value',
        static: 'Static Value',
        actuator: 'Actuator',
    },
    AttributeValueType: {
        boolean: 'Boolean',
        geo: 'Geo',
        float: 'Float',
        integer: 'Integer',
        string: 'String',
    },
    ConfigurationType: {
        protocol: 'Protocol',
        topic: 'Topic',
        translator: 'Translator',
        device_timeout: 'Device Timeout',
    },
    init(i) {
        I = i;
    },
    convertToObjectMeta: (labelValue, typeValue, attrValueType, value) => {
        return {
            labelValue,
            typeValue,
            attrValueType,
            value
        }
    },
    clickOpenTemplatePage: function() {
        I.click(locate('a').withAttr({href: '#/template/list'}));
    },
    fillNameTemplate: function(value) {
        I.fillField('Template Name', value);
    },
    seeNameTemplate: function(value) {
        I.seeInputByNameAndValue('Template Name', value);
    },
    clickCreateNew: function() {
        I.click(locate('div').withAttr({title: 'Create a new template'}));
    },
    clickCardByNameTemplate: function(nameTemplate) {
        I.click(locate('.template-card  label').withAttr({title: nameTemplate}));
    },
    _fillAttrForm: function (fieldValue, attrType, attrValueType, value) {
        within('.sidebar-attribute', () => {
            I.fillField(locate('input').first(), fieldValue);
            I.fillSelectByName('type', attrType);
            I.fillSelectByName('value_type', attrValueType);
            if (attrType !== this.AttributeType.dynamic && value) {
                I.fillField(locate('input').withAttr({name: 'static_value'}), Util.toString(value));
            }
        });
    },
    _fillMetaForm: function (labelValue, typeValue, attrValueType, value) {
        within('.sidebar-metadata', () => {
            I.fillField('label', labelValue);
            I.fillField('type', typeValue);
            I.fillSelectByName('value_type', attrValueType);
            I.fillField('static_value', Util.toString(value));
        });
    },
    _addMeta: function (labelValue, typeValue, attrValueType, value) {
        I.click(locate('.body-actions--button div').withText('New Metadata'));
        this._fillMetaForm(labelValue, typeValue, attrValueType, value);
        I.click(this.ButtonLabel.add);
    },
    _updateMeta: function (labelValue, typeValue, attrValueType, value) {
        this._clickToEditAMeta(labelValue);
        this._fillMetaForm(labelValue, typeValue, attrValueType, value);
        I.click(this.ButtonLabel.save);
    },
    addAttr: function (fieldValue, attrType, attrValueType, metaDataArray, value = '') {
        I.click(locate('.body-actions--button div').withText('New Attribute'));
        this._fillAttrForm(fieldValue, attrType, attrValueType, value);
        metaDataArray.forEach((meta) => {
            this._addMeta(meta.labelValue, meta.typeValue, meta.attrValueType, meta.value);
        });
        within('.sidebar-attribute', () => {
            I.click(this.ButtonLabel.add);
        });
    },
    updateAttr: function (fieldValue, attrType, attrValueType, metaDataArray, value = '') {
        this._clickToEditAAttr(fieldValue);
        this._fillAttrForm(fieldValue, attrType, attrValueType, value);
        metaDataArray.forEach((meta) => {
            this._updateMeta(meta.labelValue, meta.typeValue, meta.attrValueType, meta.value);
        });
        within('.sidebar-attribute', () => {
            I.click(this.ButtonLabel.save);
        });
    },
    _clickToEditAMeta: function (labelValue) {
        I.click(locate('.metadata-label').withText(labelValue).inside('.metadata-list-item'));
    },
    _seeMeta: function (labelValue, typeValue, attrValueType, value) {
        this._clickToEditAMeta(labelValue);
        within('.sidebar-metadata', () => {
            I.seeInputByNameAndValue('label', labelValue);
            I.seeInputByNameAndValue('type', typeValue);
            I.seeSelectOptionByNameAndValue('value_type', attrValueType);
            I.seeInputByNameAndValue('static_value', Util.toString(value));
            I.click(this.ButtonLabel.discard);
        });
    },
    seeAttr: function(fieldValue, attrType, attrValueType, metaDataArray, value = null) {
        this._clickToEditAAttr(fieldValue);
        within('.sidebar-attribute', () => {
            I.seeInputByNameAndValue('label', fieldValue);
            if (value) {
                I.seeInputByNameAndValue('static_value', Util.toString(value));
            }
            I.seeSelectOptionByNameAndValue('type', attrType);
            I.seeSelectOptionByNameAndValue('value_type', attrValueType);
            if (attrType !== this.AttributeType.dynamic && value) {
                I.seeInputByNameAndValue('static_value', Util.toString(value));
            }

        });
        metaDataArray.forEach((meta) => {
            this._seeMeta(meta.labelValue, meta.typeValue, meta.attrValueType, meta.value);
        });
        within('.sidebar-attribute', () => {
            I.click(this.ButtonLabel.discard);
        });
    },
    _removeMeta: function (labelValue) {
        this._clickToEditAMeta(labelValue);
        within('.sidebar-metadata', () => {
            I.seeInputByNameAndValue('label', labelValue);
            I.click(this.ButtonLabel.remove);

        });

        I.click('Confirm');
    },
    _clickToEditAAttr: function (label) {
        I.click(locate('.template-prop').withAttr({title: label, role: 'button'}));
    },
    removeAttr: function(fieldValue, attrType, attrValueType, metaDataArray) {
        this._clickToEditAAttr(fieldValue);
        within('.sidebar-attribute', () => {
            I.seeInputByNameAndValue('label', fieldValue);
        });
        metaDataArray.forEach((meta) => {
            this._removeMeta(meta.labelValue);
        });
        within('.sidebar-attribute', () => {
            I.click(this.ButtonLabel.remove);
        });
        I.click('Confirm');
    },
    _fillConfigForm: function (confType, value) {
        within('.sidebar-attribute', () => {
            I.fillSelectByName('label', confType);
            I.fillField('static_value', value);
        });
    },
    addConfigTemplate: function(confType, value) {
        I.click(locate('.body-actions--button div').withText('New Configuration'));
        this._fillConfigForm(confType, value);
        I.click(this.ButtonLabel.add);
    },
    seeConfigTemplate: function(confType, value) {
        I.click(locate('.template-prop').withAttr({title: confType.toLowerCase(), role: 'button'}));
        within('.sidebar-attribute', () => {
            I.seeSelectOptionByNameAndValue('label', confType);
            I.seeInputByNameAndValue('static_value', Util.toString(value));
            I.click(this.ButtonLabel.discard);
        });
    },
    removeConfigTemplate: function(confType) {
        I.click(locate('.template-prop').withAttr({title: confType.toLowerCase(), role: 'button'}));
        within('.sidebar-attribute', () => {
            I.seeSelectOptionByNameAndValue('label', confType);
            I.click(this.ButtonLabel.remove);

        });
        I.click('Confirm');
    },
    seeManageFirmware: function() {
        I.click(locate('.body-actions--button div').withText('Manage Firmware'));
        I.click(locate('.firmware-enabled'));
        I.click(this.ButtonLabel.discard);
    },
    clickSave: function() {
        I.click(this.ButtonLabel.save);
    },
    clickDiscard: function() {
        I.click(this.ButtonLabel.discard);
    },
    seeTemplateHasCreated: function() {
        I.see('Template created.');
    },
    removeTemplate: function() {
        I.click(this.ButtonLabel.remove);
        I.click('Confirm');
    },
    seeTemplateHasDelete: function() {
        I.see('Template removed.');
    },
    seeTemplateHasUpdated: function() {
        I.see('Template updated.');
    },
};
