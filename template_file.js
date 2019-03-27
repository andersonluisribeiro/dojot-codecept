const I = actor();
const Util = require('./Utils');
module.exports = {

    /*    // setting locators
        fields: {
            email: '#user_basic_email',
            password: '#user_basic_password'
        },
        submitButton: {css: '#new_user_basic input[type=submit]'},

        // introducing methods
        sendForm(email, password) {
            I.fillField(this.fields.email, email);
            I.fillField(this.fields.password, password);
            I.click(this.submitButton);
        }*/

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
    clickOpenTemplatePage() {
        I.click(locate('a').withAttr({href: '#/template/list'}));
    },
    fillNameTemplate(value) {
        I.fillField('Template Name', value);
    },
    clickCreateNew() {
        I.click(locate('div').withAttr({title: 'Create a new template'}));
    },
    setMeta: (labelValue, typeValue, attrValueType, value) => {
        return {
            labelValue,
            typeValue,
            attrValueType,
            value
        }
    },
    addMetaTemplate(labelValue, typeValue, attrValueType, value) {
        console.log('addMetaTemplate', labelValue, typeValue, attrValueType, value);
        I.click(locate('.body-actions--button div').withText('New Metadata'));
        within('.sidebar-metadata', () => {
            I.fillField('label', labelValue);
            I.fillField('type', typeValue);
            I.selectOption(locate('select').withAttr({name: 'value_type'}), attrValueType);
            I.fillField('static_value', Util.toString(value));
            I.click('Add');
        });
    },
    addAttrTemplate(fieldValue, attrType, attrValueType, metaDataArray, value = '') {
        console.log('addAttrTemplate');
        I.click(locate('.body-actions--button div').withText('New Attribute'));
        within('.sidebar-attribute', () => {
            I.fillField(locate('input').first(), fieldValue);
            I.selectOption(locate('select').withAttr({name: 'type'}), attrType);
            I.selectOption(locate('select').withAttr({name: 'value_type'}), attrValueType);
            if (attrType !== this.AttributeType.dynamic && value) {
                I.fillField(locate('input').withAttr({name: 'static_value'}), Util.toString(value));
            }

        });

        metaDataArray.forEach((meta) => {
            this.addMetaTemplate(meta.labelValue, meta.typeValue, meta.attrValueType, meta.value);
        });

        within('.sidebar-attribute', () => {
            I.click('Add');
        });
    },
    clickSave() {
        I.click('Save');
    },
    seeTemplateHasCreated() {
        I.see('Template created.');
    }
};
