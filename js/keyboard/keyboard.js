export default class Keyboard {
    constructor() {
        this.keyCodes = {};

        window.addEventListener("keydown", e => {
            this.keyCodes[e.keyCode] = true;
        });
        window.addEventListener("keyup", e => {
            delete this.keyCodes[e.keyCode];
        });
    }

    getState() {
        const result = {
            axes: [],
            buttons: Object.keys(this.keyCodes).map(keyCode => { return { pressed: true, touched: true, value: 1, index: keyCode }; })
        };

        return result;
    }

    get id() {
        return "Keyboard";
    }

    get index() {
        return "k";
    }
}