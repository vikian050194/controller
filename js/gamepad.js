export default class Gamepad {
    constructor(gamepad) {
        this.gamepad = gamepad;
    }

    getState(){
        return {
            axes: this.gamepad.axes.map(axis => axis),
            buttons: this.gamepad.buttons.map(({value}) => value)
        };
    }

    get id(){
        return this.gamepad.id;
    }

    get index(){
        return this.gamepad.index;
    }
}