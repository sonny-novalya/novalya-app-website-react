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

export const formatStringToColor = (color) => {
    if (typeof color === "string") {
        const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/i;
  const match = color.match(regex);


  const [, r, g, b, a = 1] = match;
  return {
    r: parseInt(r),
    g: parseInt(g),
    b: parseInt(b),
    a: parseFloat(a),
  };
    
    }else{
            return color
        }
    }
    