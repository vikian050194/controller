import Gamepad from "./gamepad";

export default class GamepadManager {
    constructor(onChange) {
        this.gamepads = [];
        this.states = [];

        this.onChange = onChange;

        window.addEventListener("gamepadconnected", this.connecthandler.bind(this));
        window.addEventListener("gamepaddisconnected", this.disconnecthandler.bind(this));

        setInterval(this.update.bind(this), 50);
    }

    addgamepad(gamepad){
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

    update(){
        this.gamepads.map(g => g.getState()).forEach(this.onChange);
    }
}