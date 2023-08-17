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
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(luminance1: number, luminance2: number): number {
    return (
        (Math.max(luminance1, luminance2) + 0.05) /
        (Math.min(luminance1, luminance2) + 0.05)
    );
}

export default function findContrastingTextColor(
    backgroundHex: string,
): [number, number, number] {
    const backgroundRgb = hexToRgb(backgroundHex);
    const backgroundLuminance = relativeLuminance(backgroundRgb);

    const targetContrastRatio = 4.5; // Adjust this as needed

    // Loop to find a suitable text color
    for (let i = 0; i <= 255; i++) {
        const textRgb: [number, number, number] = [i, i, i];
        const textLuminance = relativeLuminance(textRgb);
        const currentContrast = contrastRatio(
            backgroundLuminance,
            textLuminance,
        );

        if (currentContrast >= targetContrastRatio) {
            return textRgb;
        }
    }

    // If no suitable color found, return a default color
    return [0, 0, 0]; // Black
}
