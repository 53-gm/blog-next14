"use client";

import Image from "next/legacy/image";
import {
  JSXElementConstructor,
  ReactElement,
  useLayoutEffect,
  useState,
} from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import styles from "./zoom-image.module.css";

const ZoomImage = ({
  layout,
  src,
  width,
  height,
  alt,
  sizes,
}: Readonly<{
  layout: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
}>) => {
  return (
    <Zoom ZoomContent={CustomZoomContent}>
      <Image
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
      />
    </Zoom>
  );
};

const CustomZoomContent = ({
  buttonUnzoom, // default unzoom button
  modalState, // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
  img, // your image, prepped for zooming
}: //onUnzoom,   // unused here, but a callback to manually unzoom the image and
//   close the modal if you want to use your own buttons or
//   listeners in your custom experience
Readonly<{
  buttonUnzoom: ReactElement<HTMLButtonElement>;
  modalState: string;
  img: ReactElement<any, string | JSXElementConstructor<any>> | null;
}>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    if (modalState === "LOADED") {
      setIsLoaded(true);
    } else if (modalState === "UNLOADING") {
      setIsLoaded(false);
    }
  }, [modalState]);

  return (
    <>
      {buttonUnzoom}

      <figure className={styles.image}>{img}</figure>
    </>
  );
};

export default ZoomImage;
