"use client";

import convertObjectToQueryParam from "@/lib/helpers/convertObjectToQueryParam";
import type { IGeneralFilter } from "@/model/general-types";
import { useDebounce } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function useUrlQuery() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? undefined;
  const page = searchParams.get("page") ?? undefined;

  const [urlQuery, setUrlQuery] = useState<IGeneralFilter>({
    search,
    page: page ? Number.parseInt(page) : undefined,
  });

  const debouncedQuery = useDebounce(urlQuery, 700);

  useEffect(() => {
    const existingParams = Object.fromEntries(searchParams.entries());

    const queryParams = convertObjectToQueryParam({
      ...existingParams,
      ...debouncedQuery,
    });

    const newUrl = `${pathname}?${queryParams}`;

    router.push(newUrl);
  }, [debouncedQuery]);

  return { urlQuery, setUrlQuery, debouncedQuery };
}

export default useUrlQuery;
