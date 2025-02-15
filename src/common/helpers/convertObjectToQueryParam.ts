const convertObjectToQueryParam = (obj: { [key: string]: string }) => {
  return Object.keys(obj)
    .filter(
      (key) =>
        obj[key] !== null && obj[key] !== undefined && obj[key] !== "default",
    )
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
};

export default convertObjectToQueryParam