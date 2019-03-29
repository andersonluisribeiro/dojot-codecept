const I = actor();

module.exports = {

    editDevice(deviceId){
        I.click(locate('a').withAttr({ href: `#/device/id/${deviceId}/detail` }));
    },

    selectAttr(attr){
        I.click(locate('div').withAttr({ title: attr }));
    },

    shouldSeeMessage(message){
        I.see(message);
    }


}