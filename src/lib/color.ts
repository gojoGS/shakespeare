function hexToRgb(hexColor: string): [number, number, number] {
    const hex = hexColor.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function relativeLuminance(rgb: [number, number, number]): number {
    const [r, g, b] = rgb.map((c) => c / 255);
    return 1 - (0.299 * r + 0.587 * g + 0.114 * b);
}

export function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function findContrastingTextColor(backgroundHex: string): string {
    const backgroundRgb = hexToRgb(backgroundHex);
    const backgroundLuminance = relativeLuminance(backgroundRgb);

    if (backgroundLuminance < 0.5) {
        return "#000";
    } else {
        return "#fff";
    }
}
