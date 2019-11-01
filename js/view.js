import { applyAnimation } from "./animation";

export default class GamepadView {
    constructor(dt) {
        this.dt = dt;
    }

    onChange({ index, actions }) {
        const isNewUnit = document.getElementById(`u${index}`) === null;

        if (isNewUnit) {
            this.addUnit(index);
        } else {
            if (actions.length === 0) {
                return;
            }

            console.info(actions);
            actions.forEach(a => this.updateUnit(index, a));
        }
    }

    addUnit(index) {
        const unit = document.createElement("div");
        unit.classList.add("unit");
        unit.id = `u${index}`;
        unit.innerHTML = index;
        document.getElementById("root").appendChild(unit);
    }

    updateUnit(index, action) {
        const unit = document.getElementById(`u${index}`);

        switch (action) {
            case "up":
                applyAnimation(unit, this.dt, 0, -unit.offsetHeight);
                return;
            case "down":
                applyAnimation(unit, this.dt, 0, unit.offsetHeight);
                return;
            case "left":
                applyAnimation(unit, this.dt, -unit.offsetWidth, 0);
                return;
            case "right":
                applyAnimation(unit, this.dt, unit.offsetWidth, 0);
                return;
            case "a":
            case "b":
            case "x":
            case "y":
                unit.classList.remove("color-a");
                unit.classList.remove("color-b");
                unit.classList.remove("color-x");
                unit.classList.remove("color-y");
                unit.classList.add(`color-${action}`);
                break;
        }
    }
}