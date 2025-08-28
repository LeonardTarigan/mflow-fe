import { IGeneralFilter, IPagination } from "@/common/models/response.model";
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { Button } from "../button/button";

interface ITablePanigation extends IPagination {
  onPageChange: React.Dispatch<React.SetStateAction<IGeneralFilter>>;
}

export default function TablePagination({
  previous_page,
  next_page,
  current_page,
  total_page,
  onPageChange,
}: ITablePanigation) {
  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={!previous_page}
        onClick={() => onPageChange((p) => ({ ...p, page: 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <CaretDoubleLeftIcon size={22} weight="bold" />
      </Button>
      <Button
        disabled={!previous_page}
        onClick={() =>
          onPageChange((p) => ({ ...p, page: previous_page ?? 1 }))
        }
        size={"icon"}
        variant={"outline"}
      >
        <CaretLeftIcon size={22} weight="bold" />
      </Button>
      <div className="px-5">
        {current_page} / {total_page}
      </div>
      <Button
        disabled={!next_page}
        onClick={() => onPageChange((p) => ({ ...p, page: next_page ?? 1 }))}
        size={"icon"}
        variant={"outline"}
      >
        <CaretRightIcon size={22} weight="bold" />
      </Button>
      <Button
        disabled={!next_page}
        onClick={() => onPageChange((p) => ({ ...p, page: total_page }))}
        size={"icon"}
        variant={"outline"}
      >
        <CaretDoubleRightIcon size={22} weight="bold" />
      </Button>
    </div>
  );
}
