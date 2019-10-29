export default class GamepadView {
    onChange({ index, action }) {
        const isNewUnit = document.getElementById(`u${index}`) === null;

        if (isNewUnit) {
            this.addUnit(index);
        } else {
            this.updateUnit(index, action);
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

        return `${value}px`;
    }

    updateUnit(index, action) {
        const unit = document.getElementById(`u${index}`);
        const delta = unit.offsetWidth;

        switch (action) {
            case "up":
                unit.style.top = this.updatePositionValue(unit.style.top, -delta);
                return;
            case "down":
                unit.style.top = this.updatePositionValue(unit.style.top, delta);
                return;
            case "left":
                unit.style.left = this.updatePositionValue(unit.style.left, -delta);
                return;
            case "right":
                unit.style.left = this.updatePositionValue(unit.style.left, delta);
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