import { cn } from "@/common/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "../input/input";
import { Button } from "../button/button";

interface ISearchBar {
  defaultValue?: string;
  placeholder?: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
}

export default function SearchBar({
  defaultValue,
  onChange,
  onResetSearch,
  placeholder = "Cari Data",
}: ISearchBar) {
  return (
    <div
      className={cn(
        "flex basis-1/3 items-center bg-white overflow-hidden rounded-md border ring-neutral-900 focus-within:ring-2"
      )}
    >
      <Input
        placeholder={placeholder}
        className="w-full rounded-none !border-none !focus-visible:ring-0"
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <Button
        onClick={onResetSearch}
        size={"icon"}
        variant={"outline"}
        className="h-full rounded-none border-none px-3 text-neutral-400"
      >
        {defaultValue ? <XIcon size={20} /> : <SearchIcon size={20} />}
      </Button>
    </div>
  );
}
