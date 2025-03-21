export function formatNumber(number) {
    const stringValue = typeof number === "number" ? number.toString() : number;

    const numericValue = parseFloat(stringValue?.replace(/,/g, ""));
    if (numericValue >= 1000000) {
        return (numericValue / 1000000).toFixed(1) + "m";
    } else if (numericValue >= 1000) {
        return (numericValue / 1000).toFixed(1) + "k";
    } else {
        return numericValue.toString();
    }
}