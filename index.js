window.addEventListener("load", () => {
  const haveEvents = "ongamepadconnected" in window;
  const controllers = {};

  const addgamepad = (gamepad) => {
    controllers[gamepad.index] = gamepad;

    const constroller = document.createElement("div");
    constroller.id = `controller${gamepad.index}`;

    const title = document.createElement("h1");
    title.appendChild(document.createTextNode(gamepad.id));
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
    const controller = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(controller);
    delete controllers[gamepad.index];
  }

  const disconnecthandler = (e) => {
    removegamepad(e.gamepad);
  }

  function updateStatus() {
    if (!haveEvents) {
      scangamepads();
    }

    for (let j in controllers) {
      var controller = controllers[j];
      var d = document.getElementById("controller" + j);
      var buttons = d.getElementsByClassName("button");

      for (let i = 0; i < controller.buttons.length; i++) {
        var button = buttons[i];
        var val = controller.buttons[i];

        var pressed = val == 1.0;
        if (typeof (val) == "object") {
          pressed = val.pressed;
          val = val.value;
        }

        var pct = (val * 100).toPrecision(3);
        button.innerHTML = pct;
        // button.style.borderColor = `rgb(${pct}%,${pct}%,${pct}%)`;

        if (pressed) {
          button.className = "button pressed";
        } else {
          button.className = "button";
        }
      }

      for (let i = 0; i < controller.axes.length; i++) {
        const axis = document.getElementById(`a${i}`)
        axis.innerHTML = (controller.axes[i] * 100).toPrecision(3);
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
});