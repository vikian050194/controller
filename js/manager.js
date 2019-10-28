import Gamepad from "./gamepad";

const standardGamepad = {
    0: "b",
    1: "a",
    2: "y",
    3: "x",
    12: "up",
    13: "down",
    14: "left",
    15: "right"
};

export default class GamepadManager {
    constructor(onChange) {
        this.gamepads = [];
        this.states = [];

        this.onChange = onChange;

        window.addEventListener("gamepadconnected", this.connecthandler.bind(this));
        window.addEventListener("gamepaddisconnected", this.disconnecthandler.bind(this));

        setInterval(this.update.bind(this), 50);
    }

    addgamepad(gamepad) {
        this.gamepads[gamepad.index] = new Gamepad(gamepad);
    }

    connecthandler(e) {
        this.addgamepad(e.gamepad);
    }

    removegamepad(gamepad) {
        delete this.gamepads[gamepad.index];
    }

    disconnecthandler(e) {
        this.removegamepad(e.gamepad);
    }

    getGamepads() {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        const result = [];

        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                result[gamepads[i].index] = gamepads[i];
            }
        }

        return result;
    }

    update() {
        this.getGamepads()
            .map(g => new Gamepad(g))
            .map(g => { return { index: g.index, buttons: g.getState().buttons }; })
            .filter(({ buttons }) => buttons.some(b => b === 1))
            .map(({ index, buttons }) => {
                let actions = buttons.map((v, i) => v === 1 ? standardGamepad[i] : undefined).filter(a => a !== undefined);
                let action = actions[0] || "no";

                return { index, action };
            })
            .forEach(this.onChange);
    }
}