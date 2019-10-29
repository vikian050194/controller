import Manager from "./gamepad/manager";
import GamepadView from "./view";

window.addEventListener("load", () => {
    new Manager((payload) => { new GamepadView().onChange(payload); });
});