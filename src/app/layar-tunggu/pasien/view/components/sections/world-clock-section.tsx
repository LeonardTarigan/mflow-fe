import { useEffect, useState } from "react";

const cities = [
  { name: "Jakarta", tz: "Asia/Jakarta" },
  { name: "Kuala Lumpur", tz: "Asia/Kuala_Lumpur" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "New York", tz: "America/New_York" },
  { name: "Melbourne", tz: "Australia/Melbourne" },
];

export default function WorldClockSection() {
  const [cityTimes, setCityTimes] = useState<string[]>(
    cities.map(() => "--:--"),
  );

  useEffect(() => {
    function updateTimes() {
      setCityTimes(
        cities.map((city) =>
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: city.tz,
          }),
        ),
      );
    }
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex size-full basis-1/3 flex-col divide-y rounded-xl bg-white py-3 text-center">
      {cities.map((city, idx) => (
        <div
          key={city.name}
          className="flex grow items-center justify-between gap-2 px-3 py-2 font-medium"
        >
          <h2>{city.name}</h2>
          <p className="text-xl font-bold">{cityTimes[idx]}</p>
        </div>
      ))}
    </section>
  );
}
