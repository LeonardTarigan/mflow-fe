import { cn } from "../lib/utils";

const highlightMatch = (
  text: string,
  query: string,
  highlightedTextClassName?: string,
) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className={`${cn("font-semibold text-secondary-600", highlightedTextClassName)}`}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
};

export default highlightMatch;
