// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default (obj: { [key: string]: any }) => {
  return Object.keys(obj)
    .filter(
      (key) =>
        obj[key] !== null && obj[key] !== undefined && obj[key] !== "default",
    )
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
};
