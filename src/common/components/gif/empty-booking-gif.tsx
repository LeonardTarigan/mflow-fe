import type { IframeHTMLAttributes } from "react";

export default function EmptyBookingGif(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Empty"
      src="https://lottie.host/embed/dbec2cb7-f62e-455f-a65e-abcfbf8b54f0/bn8gJPeOq9.lottie"
    ></iframe>
  );
}
