const I = actor();
let ids;
var deviceId;

module.exports = {
    
    async createADevice(){
        let template = await I.createTemplate({
            label: "String Template",
            attrs: [
                {
                label: "text",
                type: "dynamic",
                value_type: "string"
                }
            ]
        });
    
        let templateId = template['template']['id'];
    
        let device = await I.createDevice({
            "templates": [
                templateId
            ],
            "label": "String device"
        });
        
        deviceId = device['devices'][0]['id'];
    },

    clickOpen() {
        I.click(locate('a').withAttr({href: '#/flows'}));
    },

    clickCreateNew() {
        I.click(locate('a').withAttr({href: '#/flows/new'}));
        I.wait(1);
    },

    setFlowName(value){
        I.fillField('Flow name', value);
    },

    addDeviceInput(){
        I.dragSlider("#palette_node_device_in", 400);
    },

    addSwitch(){
        I.dragSlider("#palette_node_switch", 600);
    },

    addChange(){
        I.dragSlider("#palette_node_change", 800);
    },

    addDeviceOutput(){
        I.dragSlider("#palette_node_device_out", 1000);
    },

    addNotification(){
        I.dragSlider("#palette_node_device_out", 1200);
    },


    async connectFlows(){
        ids = await I.grabAttributeFrom('.nodegroup', 'id');
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[0]}`), locate(`.port_input`).inside(`#${ids[1]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[1]}`), locate(`.port_input`).inside(`#${ids[2]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[2]}`), locate(`.port_input`).inside(`#${ids[3]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[2]}`), locate(`.port_input`).inside(`#${ids[4]}`));
    },

    editDeviceInput(){
        I.click(`#${ids[0]}`);
        I.doubleClick(`#${ids[0]}`);
        I.fillField('#node-input-name', "my input");
    },

    selectDevice(){
        I.fillField('#node-input-device_source_id', deviceId);
    }

    // clickOnSave(){
    //     I.click('.new-btn-circle');
    // },

    // seeFlowHasCreated() {
    //     I.see('Flow created.');
    // },



}
