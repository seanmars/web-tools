/**
 * Reverse the string.
 * @param {string} str 
 */
function reverseString(str) {
    return str.split("").reverse().join("");
}

Object.defineProperty(String.prototype, 'reverse', {
    value: function () {
        return reverseString(this);
    },
    writable: true,
    configurable: true
});

Object.defineProperty(String.prototype, 'humanableBit', {
    value: function (num, symbol) {
        if (!num || num < 0) {
            return this;
        }
        symbol = symbol || " ";

        let reverseStr = reverseString(this);
        let temp = [];
        for (let i = 0, len = reverseStr.length; i < len; i += num) {
            temp.push(reverseStr.substr(i, num));
        }

        return temp.reverse().join(symbol);
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Number.prototype, 'div', {
    /**
     * 
     * @param {Number} num 
     * @returns {{quotient: Number, remainder: Number}}
     */
    value: function (num) {
        var quotient = (~~(this / num));
        var remainder = this % num;

        return {
            quotient: quotient,
            remainder: remainder
        };
    },
    writable: true,
    configurable: true
});