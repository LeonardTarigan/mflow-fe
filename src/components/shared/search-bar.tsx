import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { SearchIcon, XIcon } from "lucide-react";

interface ISearchBar {
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
}

export default function SearchBar({
  defaultValue,
  onChange,
  onResetSearch,
}: ISearchBar) {
  return (
    <div
      className={cn(
        "flex basis-1/3 items-center overflow-hidden rounded-md border ring-neutral-900 focus-within:ring-2",
      )}
    >
      <Input
        placeholder="Cari Obat"
        className="w-full rounded-none border-none focus-visible:ring-0"
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
