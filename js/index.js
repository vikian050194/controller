import GamepadManager from "./gamepad/manager";
import KeyboardManager from "./keyboard/manager";
import MouseManager from "./mouse/manager";
import ControllerView from "./view";

window.addEventListener("load", () => {
    new GamepadManager((payload) => { new ControllerView().onChange(payload); });
    new KeyboardManager((payload) => { new ControllerView().onChange(payload); });
    new MouseManager((payload) => { new ControllerView().onChange(payload); });
});