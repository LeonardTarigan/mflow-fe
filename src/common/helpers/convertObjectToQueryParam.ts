const convertObjectToQueryParam = (obj: Record<string, unknown>): string => {
  return Object.keys(obj)
    .filter(
      (key) =>
        obj[key] !== null && obj[key] !== undefined && obj[key] !== "default"
    )
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(obj[key]))}`
    )
    .join("&");
};

export default convertObjectToQueryParam;
