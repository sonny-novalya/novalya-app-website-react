export const rgbToHex = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    const [r, g, b] = result.map(Number);
    return (
        '#' +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase()
    );
};
