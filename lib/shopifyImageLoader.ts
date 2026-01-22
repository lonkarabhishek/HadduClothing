import type { ImageLoaderProps } from "next/image";

export default function shopifyImageLoader({
    src,
    width,
    quality,
}: ImageLoaderProps) {
    const q = quality || 75;

    if (src.startsWith("http")) {
        return `${src}&width=${width}&quality=${q}`;
    }

    return src;
}
