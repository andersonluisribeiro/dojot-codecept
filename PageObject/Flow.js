const I = actor();

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

    addDeviceToFlow(){
        I.dragSlider("#palette_node_device_in", 400);
    },

    addHttpToFlow(){
        I.dragSlider("#palette_node_http", 800);
    },

    addChangeToFlow(){
        I.dragSlider("#palette_node_change", 600);
    },

    async connectFlows(){
        let ids = await I.grabAttributeFrom('.nodegroup', 'id');
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[0]}`), locate(`.port_input`).inside(`#${ids[1]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[1]}`), locate(`.port_input`).inside(`#${ids[2]}`));
    },

    clickOnSave(){
        I.click('.new-btn-circle');
    },

    seeFlowHasCreated() {
        I.see('Flow created.');
    },

}
