const I = actor();

module.exports = {

    openDevicesPage(){
        I.click(locate('a').withAttr({ href: `#/device` }));
    },

    editDevice(deviceId){
        I.click(locate('a').withAttr({ href: `#/device/id/${deviceId}/detail` }));
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

    shouldSeeMessage(message){
        I.see(message);
    },

    change64QtyToShowPagination(){
        I.selectOption(locate('select').inside('.card-select-2'), '64');
    },

}