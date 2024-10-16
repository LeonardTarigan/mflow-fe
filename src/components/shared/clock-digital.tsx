import { format } from "date-fns";
import { type HTMLAttributes, useEffect, useState } from "react";

export default function ClockDigital(props: HTMLAttributes<HTMLDivElement>) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    format(new Date(), "HH:mm:ss"),
  );

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return <div {...props}>--:--:--</div>;

  return <div {...props}>{currentTime}</div>;
}
