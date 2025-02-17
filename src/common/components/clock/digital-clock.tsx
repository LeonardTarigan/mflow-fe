import { format } from "date-fns";
import { type HTMLAttributes, useEffect, useState } from "react";

interface IClockDigital extends HTMLAttributes<HTMLDivElement> {
  timeFormat?: string;
}

export default function DigitalClock({
  timeFormat = "HH:mm:ss",
  ...props
}: IClockDigital) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    format(new Date(), timeFormat),
  );

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), timeFormat));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return <div {...props}>--:--:--</div>;

  return <div {...props}>{currentTime}</div>;
}
