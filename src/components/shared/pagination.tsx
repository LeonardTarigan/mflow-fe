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
  previousPage,
  nextPage,
  currentPage,
  totalPage,
  onPageChange,
}: ITablePanigation) {
  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={!previousPage}
        onClick={() => onPageChange((p) => ({ ...p, page: 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronsLeftIcon size={20} />
      </Button>
      <Button
        disabled={!previousPage}
        onClick={() => onPageChange((p) => ({ ...p, page: previousPage ?? 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronLeftIcon size={20} />
      </Button>
      <div className="px-5">
        {currentPage} / {totalPage}
      </div>
      <Button
        disabled={!nextPage}
        onClick={() => onPageChange((p) => ({ ...p, page: nextPage ?? 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronRightIcon size={20} />
      </Button>
      <Button
        disabled={!nextPage}
        onClick={() => onPageChange((p) => ({ ...p, page: totalPage }))}
        size={"icon"}
        variant={"outline"}
      >
        <ChevronsRightIcon size={20} />
      </Button>
    </div>
  );
}
