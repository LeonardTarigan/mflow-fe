import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { IGeneralFilter } from "../models/response.model";
import convertObjectToQueryParam from "../helpers/convertObjectToQueryParam";

function useUrlQuery() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);

  const [urlQuery, setUrlQuery] = useState<IGeneralFilter>({
    search: searchParams.get("search") || undefined,
    page: Math.max(1, Number.parseInt(searchParams.get("page") || "1")),
  });

  const debouncedQuery = useDebounce(urlQuery, 700);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }
    setIsInitialized(true);

    const existingParams = Object.fromEntries(searchParams.entries());
    const queryParams = convertObjectToQueryParam({
      ...existingParams,
      ...debouncedQuery,
    });

    const newUrl = queryParams ? `${pathname}?${queryParams}` : pathname;
    router.replace(newUrl);
  }, [debouncedQuery, pathname, router, searchParams]);

  return { urlQuery, setUrlQuery, debouncedQuery, isInitialized };
}

export default useUrlQuery;
