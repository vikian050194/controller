import Gamepad from "./gamepad";
import standardGamepadMapping from "./mapping";

export default class GamepadManager {
    constructor(onChange) {
        this.gamepads = [];
        this.states = [];

        this.onChange = onChange;

        window.addEventListener("gamepadconnected", this.connecthandler.bind(this));
        window.addEventListener("gamepaddisconnected", this.disconnecthandler.bind(this));
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
            .filter(({ buttons }) => buttons.some(b => b.pressed))
            .map(({ index, buttons }) => {
                let actions = buttons.map((b, i) => b.value === 1 ? standardGamepadMapping[i] : undefined).filter(a => a !== undefined) || [];

                return { index, actions };
            })
            .forEach(this.onChange);
    }
}