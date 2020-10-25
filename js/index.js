import ControllerManager from "./manager";
import ControllerView from "./view";

window.addEventListener("load", () => {
    const settings = {
        delta: 50,
        keyboard: true,
        gamepad: true,
        mouse: false
    };
    const view = new ControllerView(settings);
    new ControllerManager((payload) => { view.onChange(payload); }, settings);
});