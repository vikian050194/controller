import GamepadManager from "./gamepad/manager";
import KeyboardManager from "./keyboard/manager";
import MouseManager from "./mouse/manager";

const defaultSettings = {
    delta: 100,
    keyboard: false,
    gamepad: true,
    mouse: false
};

export default class ControllerManager {
    constructor(onChange = (payload) => { console.info(payload); }, settings = {}) {
        this.managers = [];

        settings = Object.assign({}, defaultSettings, settings);

        settings.keyboard && this.managers.push(new KeyboardManager(onChange));
        settings.gamepad && this.managers.push(new GamepadManager(onChange));
        settings.mouse && this.managers.push(new MouseManager(onChange));

        this.onChange = onChange;

        setInterval(this.update.bind(this), settings.delta);
    }

    update() {
        this.managers.forEach(m => m.update());
    }
}