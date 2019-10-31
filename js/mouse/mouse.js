export default class Mouse {
    constructor() {
        this.buttons = {};
        this.movements = {};

        window.addEventListener("mousedown", e => {
            e.preventDefault();

            this.buttons[e.button] = true;
        });

        window.addEventListener("mouseup", e => {
            delete this.buttons[e.button];
        });

        window.addEventListener("mousemove", e => {
            const diff = 1;

            if (e.movementX > diff) {
                this.movements["right"] = true;
            }
            if (e.movementX < -diff) {
                this.movements["left"] = true;
            }
            if (e.movementY > diff) {
                this.movements["down"] = true;
            }
            if (e.movementY < -diff) {
                this.movements["up"] = true;
            }
        });
    }

    getState() {
        const buttons = Object.keys(this.buttons).map(button => { return { pressed: true, touched: true, value: 1, index: button }; });
        const movements = Object.keys(this.movements).map(movement => { return { pressed: true, touched: true, value: 1, index: movement }; });
        const allActions = buttons.concat(movements);

        const result = {
            axes: [],
            buttons: allActions
        };

        this.movements = {};

        return result;
    }

    get id() {
        return "Mouse";
    }

    get index() {
        return "m";
    }
}