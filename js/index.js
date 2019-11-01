import ControllerManager from "./manager";
import ControllerView from "./view";

window.addEventListener("load", () => {
    const dt = 50;
    const view = new ControllerView(dt);
    new ControllerManager(dt, (payload) => { view.onChange(payload); });
});