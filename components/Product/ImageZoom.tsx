"use client";

import { useEffect, useRef } from "react";
import ImageZoom from "js-image-zoom";

type Props = {
  src: string;
  width?: number;
  height?: number;
};

export default function ProductImageZoom({
  src,
  width = 400,
  height = 400,
}: Props) {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      const options = {
        width,
        height,
        zoomWidth: 300,
        scale: 1.5,
        offset: { vertical: 0, horizontal: 10 },
        zoomPosition: "right" as
          | "right"
          | "left"
          | "top"
          | "bottom"
          | "original", // có thể là 'right', 'left', 'top', 'bottom', 'original'
      };
      new ImageZoom(imageContainerRef.current, options);
    }
  }, [src, width, height]);

  return (
    <div ref={imageContainerRef}>
      <img src={src} alt="Product" width={width} height={height} />
    </div>
  );
}
