/* eslint-disable no-unused-vars */
import GamepadManager from "./gamepad/manager";
import KeyboardManager from "./keyboard/manager";
import MouseManager from "./mouse/manager";

export default class ControllerManager {
    constructor(dt, onChange) {
        this.managers = [
            new GamepadManager(onChange),
            new KeyboardManager(onChange)
            // new MouseManager(onChange)
        ];

        this.onChange = onChange;

        setInterval(this.update.bind(this), dt);
    }

    update() {
        this.managers.forEach(m => m.update());
    }
}