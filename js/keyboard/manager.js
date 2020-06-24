import Keyboard from "./keyboard";
import standardKeyboardMapping from "./mapping";

export default class KeyboardManager {
    constructor(onChange) {
        this.keyboard = new Keyboard();

        this.onChange = onChange;
    }

    update() {
        const { buttons } = this.keyboard.getState();

        let actions = buttons.map(({index}) => standardKeyboardMapping[index]).filter(a => a !== undefined) || [];

        if(actions.length === 0){
            return;
        }

        this.onChange({ index: this.keyboard.index, actions });
    }
}