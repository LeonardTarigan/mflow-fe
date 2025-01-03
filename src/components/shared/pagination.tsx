import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "./button";
import type { IGeneralFilter, IPagination } from "@/model/general-types";

interface ITablePanigation extends IPagination {
  onPageChange: React.Dispatch<React.SetStateAction<IGeneralFilter>>;
}

export default function TablePagination({
  prev,
  next,
  current,
  total,
  onPageChange,
}: ITablePanigation) {
  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={!prev}
        onClick={() => onPageChange((p) => ({ ...p, page: 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronsLeftIcon size={20} />
      </Button>
      <Button
        disabled={!prev}
        onClick={() => onPageChange((p) => ({ ...p, page: prev ?? 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronLeftIcon size={20} />
      </Button>
      <div className="px-5">
        {current} / {total}
      </div>
      <Button
        disabled={!next}
        onClick={() => onPageChange((p) => ({ ...p, page: next ?? 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronRightIcon size={20} />
      </Button>
      <Button
        disabled={!next}
        onClick={() => onPageChange((p) => ({ ...p, page: total }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronsRightIcon size={20} />
      </Button>
    </div>
  );
}
