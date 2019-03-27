const I = actor();

module.exports = {

    clickOpen() {
        I.click(locate('a').withAttr({href: '#/flows'}));
    },

    clickCreateNew() {
        I.click(locate('a').withAttr({href: '#/flows/new'}));
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
        let news = ids.map(id => id.split('.')[0]);
        console.log(news);
        console.log(`#${news[0]}`);

        I.dragAndDrop(locate(`.port_output`).inside(`#${news[0]}`), locate(`.port_input`).inside(`#${news[1]}`));
        // I.dragAndDrop(locate(`.port_output`).at(1), locate(`.port_input`).at(1));
        // I.dragAndDrop(locate(`.port_output`).at(2), locate(`.port_input`).at(2));
    }

}
