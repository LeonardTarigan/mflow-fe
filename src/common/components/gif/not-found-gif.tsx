import type { IframeHTMLAttributes } from "react";

export default function GifNotFound(
  props?: IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <iframe
      {...props}
      title="Not Found"
      src="https://lottie.host/embed/b5db43dc-864b-4e2d-8ad1-042536dbe95b/O1cPFK7CcS.json"
    />
  );
}
