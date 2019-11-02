import * as animation from "./animation";

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
            this.updateUnit(index, actions);
        }
    }

    addUnit(index) {
        const unit = document.createElement("div");
        unit.classList.add("unit");
        unit.id = `u${index}`;
        unit.innerHTML = index;
        document.getElementById("root").appendChild(unit);
    }

    updateUnit(index, actions) {
        const unit = document.getElementById(`u${index}`);

        const movement = actions.reduce((acc, a) => {
            switch (a) {
                case "up":
                    acc.dy = -unit.offsetHeight;
                    return acc;
                case "down":
                    acc.dy = unit.offsetHeight;
                    return acc;
                case "left":
                    acc.dx = -unit.offsetWidth;
                    return acc;
                case "right":
                    acc.dx = unit.offsetWidth;
                    return acc;
            }
        }, { dx: 0, dy: 0 }) || { dx: 0, dy: 0 };

        animation.applyMovement(unit, movement.dx, movement.dy);

        actions.forEach(a => {
            switch (a) {
                case "a":
                case "b":
                case "x":
                case "y":
                    unit.classList.remove("color-a");
                    unit.classList.remove("color-b");
                    unit.classList.remove("color-x");
                    unit.classList.remove("color-y");
                    unit.classList.add(`color-${a}`);
                    break;
            }
        });
    }
}