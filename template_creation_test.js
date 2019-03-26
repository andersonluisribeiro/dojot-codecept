/*import  attrTest from 'Types';*/
const { attrType, attrValueType } = require('./Types');

Feature('Template creation');

Before(login => {
    login('admin');
});

Scenario('Creating a simple template', async (I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({ title: 'Create a new template' }));
    I.fillField('Template Name', 'Temp1');

/*    I.addAttrTemplate('int', attrType.dynamic, attrValueType.integer);
    I.addAttrTemplate('bool', attrType.dynamic, attrValueType.boolean);
    I.addAttrTemplate('number', attrType.dynamic, attrValueType.float);
    I.addAttrTemplate('gps', attrType.dynamic, attrValueType.geo);
    I.addAttrTemplate('text', attrType.dynamic, attrValueType.string);*/

    I.addAttrTemplate('text', attrType.static, attrValueType.string, 'value of text');

    I.click('Save');
    I.see('Template created.');
});
