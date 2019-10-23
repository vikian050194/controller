const haveEvents = "ongamepadconnected" in window;
const controllers = {};

const addUnit = (index) => {
    const unit = document.createElement("div");
    unit.classList.add("unit");
    unit.id = `u${index}`;
    unit.innerHTML = index;
    document.getElementById("root").appendChild(unit);
};

const addgamepad = (gamepad) => {
    const { index } = gamepad;

    addUnit(index);

    controllers[index] = gamepad;

    const constroller = document.createElement("div");
    constroller.id = `controller${index}`;

    const title = document.createElement("h1");
    title.appendChild(document.createTextNode(gamepad.index + ": " + gamepad.id));
    constroller.appendChild(title);

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    for (let i = 0; i < gamepad.buttons.length; i++) {
        const button = document.createElement("div");
        button.className = "button";
        button.id = `b${i}`;
        button.innerHTML = i;
        buttons.appendChild(button);
    }

    constroller.appendChild(buttons);

    let axes = document.createElement("div");
    axes.classList.add("axes");

    for (let i = 0; i < gamepad.axes.length; i++) {

        const axis = document.createElement("div");
        axis.classList.add("axis");
        axis.id = "a" + i;
        axis.innerHTML = i;

        axes.appendChild(axis);
    }

    constroller.appendChild(axes);

    // See https://github.com/luser/gamepadtest/blob/master/index.html
    var start = document.getElementById("start");
    if (start) {
        start.style.display = "none";
    }

    document.getElementById("root").appendChild(constroller);
    requestAnimationFrame(updateStatus);
}

const connecthandler = (e) => {
    addgamepad(e.gamepad);
}

const removegamepad = (gamepad) => {
    document.getElementById("controller" + gamepad.index).remove();
    delete controllers[gamepad.index];
}

const disconnecthandler = (e) => {
    removegamepad(e.gamepad);
}

const updatePositionValue = (currentValue, delta) => {
    currentValue = currentValue || "0px"
    let value = parseInt(currentValue.slice(0, -2));
    value += delta;

    return `${value}px`;
}

const updateUnit = (unitIndex, action) => {
    const unit = document.getElementById(`u${unitIndex}`);
    const delta = unit.clientWidth;

    switch (action) {
        case "up":
            unit.style.top = updatePositionValue(unit.style.top, -delta);
            return;
        case "down":
            unit.style.top = updatePositionValue(unit.style.top, delta);
            return;
        case "left":
            unit.style.left = updatePositionValue(unit.style.left, -delta);
            return;
        case "right":
            unit.style.left = updatePositionValue(unit.style.left, delta);
            return;
    }
};

const updateStatus = () => {
    if (!haveEvents) {
        scangamepads();
    }

    for (let j in controllers) {
        var controller = controllers[j];
        const d = document.getElementById("controller" + j);
        const buttons = d.getElementsByClassName("button");

        for (let i = 0; i < controller.buttons.length; i++) {
            const button = buttons[i];
            let val = controller.buttons[i];
            let pressed = val == 1.0;

            if (typeof (val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            button.innerHTML = `${i}<br/>${(val * 100).toPrecision(3)}`;

            if (pressed) {
                button.className = "button pressed";

                if (i === 14) {
                    updateUnit(j, "left");
                }
                if (i === 15) {
                    updateUnit(j, "right");
                }
                if (i === 12) {
                    updateUnit(j, "up");
                }
                if (i === 13) {
                    updateUnit(j, "down");
                }
            } else {
                button.className = "button";
            }
        }

        for (let i = 0; i < controller.axes.length; i++) {
            const axis = document.getElementById(`a${i}`)
            axis.innerHTML = `${i}<br/>${(controller.axes[i] * 100).toPrecision(3)}`;
        }
    }

    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
            } else {
                addgamepad(gamepads[i]);
            }
        }
    }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
    setInterval(scangamepads, 500);
}