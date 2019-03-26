// in this file you can append custom step methods to 'I' object
const {attrType: constAttrType} = require('./Types');

module.exports = function () {
    return actor({

        /**
         *
         * @param fieldValue
         * @param attrType
         * @param attrValueType
         * @param value
         */
        addAttrTemplate: function (fieldValue, attrType, attrValueType, value = '') {
            this.click(locate('.body-actions--button div').withText('New Attribute'));
            within('.sidebar-attribute', () => {
                this.fillField(locate('input').first(), fieldValue);
                this.selectOption(locate('select').withAttr({name: 'type'}), attrType);
                this.selectOption(locate('select').withAttr({name: 'value_type'}), attrValueType);
                if (attrType !== constAttrType.dynamic && value ) {
                    this.fillField(locate('input').withAttr({ name: 'static_value' }), value);
                }
                this.click('Add');
            });
        }
    });
}
