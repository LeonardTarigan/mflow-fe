import type { IframeHTMLAttributes } from "react";

export default function EmptyListGif(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Empty List"
      src="https://lottie.host/embed/68c4fa24-ae36-4b0f-b2ae-ecb1c186e8eb/StMdG82RcM.lottie"
    ></iframe>
  );
}
