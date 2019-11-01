import Mouse from "./mouse";
import standardMouseMapping from "./mapping";

export default class MouseManager {
    constructor(onChange) {
        this.mouse = new Mouse();

        this.onChange = onChange;
    }

    update() {
        const { buttons } = this.mouse.getState();

        let actions = buttons.map(({index}) => standardMouseMapping[index]).filter(a => a !== undefined) || [];

        this.onChange({ index: this.mouse.index, actions });
    }
}