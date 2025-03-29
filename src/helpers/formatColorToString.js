export const formatColorToString = (colorObj) => {
    if (typeof colorObj === "string") {
        return colorObj;
    } else if (
        typeof colorObj === "object" &&
        colorObj !== null &&
        "r" in colorObj &&
        "g" in colorObj &&
        "b" in colorObj &&
        "a" in colorObj
    ) {
        return `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
    }
};