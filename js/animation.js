const updatePositionValue = (currentValue, delta) => {
    currentValue = currentValue || "0px";
    const value = parseInt(currentValue.slice(0, -2)) + delta;

    return `${value}px`;
};

let count = 0;

const calculateMovement = (element, dx, dy) => {
    const top = element.style.top || "0px";
    const left = element.style.left || "0px";

    const newTop = updatePositionValue(top, dy);
    const newLeft = updatePositionValue(left, dx);

    return { top, left, newTop, newLeft };
};

const applyMovement = (element, dx, dy) => {
    const { newTop, newLeft } = calculateMovement(element, dx, dy);
    element.style.top = newTop;
    element.style.left = newLeft;
};

const applyAnimation = (element, dt, dx, dy) => {
    element.offsetHeight;
    const { top, left, newTop, newLeft } = calculateMovement(element, dx, dy);

    element.animate([
        {
            top,
            left
        },
        {
            top: newTop,
            left: newLeft
        }
    ], {
        duration: dt
    }).onfinish = () => {
        element.style.top = newTop;
        element.style.left = newLeft;
    };
};

export { applyAnimation, applyMovement };