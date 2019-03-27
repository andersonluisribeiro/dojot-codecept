class Utils {
    static toString(value) {
        let valueToShow = 'undefined';
        if (((typeof value) === 'boolean')) {
            valueToShow = (value ? 'true' : 'false');
        } else if ((typeof value) === 'number' || (typeof value) === 'string') {
            valueToShow = value.toString();
        }
        return valueToShow;
    }
}

module.exports = Utils;
