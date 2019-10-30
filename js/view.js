export default class GamepadView {
    onChange({ index, actions }) {
        const isNewUnit = document.getElementById(`u${index}`) === null;

        if (isNewUnit) {
            this.addUnit(index);
        } else {
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

    updatePositionValue(currentValue, delta) {
        currentValue = currentValue || "0px";
        let value = parseInt(currentValue.slice(0, -2));
        value += delta;

        return value;
    }

    updateUnit(index, action) {
        const unit = document.getElementById(`u${index}`);

        switch (action) {
            case "up":
                if (unit.style.top !== "0px") {
                    unit.style.top = `${this.updatePositionValue(unit.style.top, -unit.offsetHeight)}px`;
                }
                return;
            case "down":
                // eslint-disable-next-line no-case-declarations
                const newTopValue = this.updatePositionValue(unit.style.top, unit.offsetHeight);
                if (newTopValue + unit.offsetHeight <= window.innerHeight) {
                    unit.style.top = `${newTopValue}px`;
                }
                return;
            case "left":
                if (unit.style.left !== "0px") {
                    unit.style.left = `${this.updatePositionValue(unit.style.left, -unit.offsetWidth)}px`;
                }
                return;
            case "right":
                // eslint-disable-next-line no-case-declarations
                const newLeftValue = this.updatePositionValue(unit.style.left, unit.offsetWidth);
                if (newLeftValue + unit.offsetWidth <= window.innerWidth) {
                    unit.style.left = `${newLeftValue}px`;
                }
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