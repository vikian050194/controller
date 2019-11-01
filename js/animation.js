const updatePositionValue = (currentValue, delta) => {
    currentValue = currentValue || "0px";
    const value = parseInt(currentValue.slice(0, -2)) + delta;

    return `${value}px`;
};

const applyAnimation = (element, dt, dx, dy) => {
    const top = element.style.top || "0px";
    const left = element.style.left || "0px";

    const newTop = updatePositionValue(top, dy);
    const newLeft = updatePositionValue(left, dx);

    element.offsetHeight;
    console.info(element.style.top);
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
        console.info(element.style.top + "finished");
        element.style.top = newTop;
        element.style.left = newLeft;
    };
};

export { applyAnimation };