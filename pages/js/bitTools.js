$(function () {
    /** @type {HTMLInputElement} */
    let idValue = document.getElementById('idValue');

    /** @type {HTMLInputElement} */
    let bitIndex = document.getElementById('bitIndex');
    /** @type {HTMLInputElement} */
    let bitPosition = document.getElementById('bitPosition');

    /** @type {HTMLDivElement} */
    let bitVision = document.getElementById('bitVision');

    /** @type {boolean} shiftBitIndex Set false that bit-index as a 0-based value, true as a 1-based */
    let shiftBitIndex = false;

    /**
     * @param {Number} id
     * @returns {{index: Number, position: Number}|null}
     */
    function calcualteBitInfo(id) {
        if (!id || !Number.isInteger(id) || isNaN(id)) {
            return;
        }

        /** @type {{quotient: Number, remainder: Number}} result */
        let result = id.div(8);
        return {
            index: result.remainder == 0 ? result.quotient - 1 : result.quotient,
            position: result.remainder == 0 ? 8 : result.remainder
        };
    }

    /**
     * @param {Number} index 
     * @param {Number} position 
     * @returns {Number}
     */
    function calculateId(index, position) {
        return index * 8 + position;
    }

    /**
     * Input event for bit input
     * @param {HTMLInputElement} htmlInputElement 
     * @param {Event} ev 
     */
    function onBitInputEvent(htmlInputElement, ev) {
        let index = bitIndex.value;
        let position = bitPosition.value;
        if (!index || !Number.isInteger(+index) ||
            !position || !Number.isInteger(+position)) {
            updateBitVision(bitVision);
            return;
        }

        let vIdx = parseInt(index);
        let vPos = parseInt(position);
        vPos %= 8;
        if (vPos == 0) {
            vPos = 8;
        }
        bitPosition.value = vPos;

        let id = calculateId(vIdx, vPos);
        idValue.value = id;

        updateBitVision(bitVision, vPos);
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Number} position
     */
    function updateBitVision(element, position) {
        let spans = element.getElementsByClassName('border');
        [...spans].forEach((span) => {
            /** @type {HTMLSpanElement} */
            let textSpan = span.getElementsByTagName('span')[0];
            if (span.dataset.position == position) {
                textSpan.className = 'border-text text-primary';
                textSpan.textContent = 1;
            } else {
                textSpan.className = 'border-text text-body';
                textSpan.textContent = 0;
            }
        });
    }

    idValue.addEventListener('input', (e) => {
        let value = e.target.value;
        if (!value || !Number.isInteger(+value)) {
            // console.error(value + ' is not number.');
            bitIndex.value = '';
            bitPosition.value = '';
            updateBitVision(bitVision);
            return;
        }

        let result = calcualteBitInfo(parseInt(value));
        if (!result) {
            bitIndex.value = '';
            bitPosition.value = '';
            updateBitVision(bitVision);
            return;
        }

        bitIndex.value = shiftBitIndex ? result.index + 1 : result.index;
        bitPosition.value = result.position;

        updateBitVision(bitVision, result.position);
    });

    bitIndex.addEventListener('input', onBitInputEvent);
    bitPosition.addEventListener('input', onBitInputEvent);

    updateBitVision(bitVision);

    idValue.focus();
});