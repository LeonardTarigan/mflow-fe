import type { IframeHTMLAttributes } from "react";

export default function DrugGif(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Drug"
      src="https://lottie.host/embed/604611ec-2b5d-408c-a4e4-290e5eef2e1d/DPA6KSzXSY.lottie"
    ></iframe>
  );
}
