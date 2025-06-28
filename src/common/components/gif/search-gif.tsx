import type { IframeHTMLAttributes } from "react";

export default function SearchGif(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Search"
      src="https://lottie.host/embed/15b4a58f-35df-4e3e-9823-ebcecd25bf5a/rqFckNRze1.lottie"
    ></iframe>
  );
}
