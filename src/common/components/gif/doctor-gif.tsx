import type { IframeHTMLAttributes } from "react";

export default function DoctorGif(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Doctor"
      src="https://lottie.host/embed/bd825bea-a5dc-45d3-bd76-e62ce6c01222/Mtij7zaQrE.lottie"
    ></iframe>
  );
}
