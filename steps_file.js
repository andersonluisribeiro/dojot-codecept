// in this file you can append custom step methods to 'I' object
module.exports = function () {
    return actor({
        seeInputByNameAndValue: function (name, value) {
            this.seeElement(locate('input').withAttr({name, value}));
        },
        seeSelectOptionByNameAndValue: function (name, value) {
            this.seeElement(locate('select').withAttr({name}), value);
        }
    });
};
