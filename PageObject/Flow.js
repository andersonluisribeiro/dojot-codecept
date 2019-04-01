const I = actor();
let ids;

module.exports = {

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

    // clickOnSave(){
    //     I.click('.new-btn-circle');
    // },

    // seeFlowHasCreated() {
    //     I.see('Flow created.');
    // },



}
