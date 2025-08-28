import { cn } from "@/common/lib/utils";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

interface ISearchBar {
  defaultValue?: string;
  placeholder?: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSearch: () => void;
  containerClassName?: string;
  inputClassName?: string;
}

export default function SearchBar({
  defaultValue,
  onChange,
  onResetSearch,
  placeholder = "Cari Data",
  containerClassName,
  inputClassName,
}: ISearchBar) {
  return (
    <div
      className={cn(
        "flex basis-1/3 items-center overflow-hidden rounded-md border bg-white ring-neutral-900 focus-within:ring-2",
        containerClassName,
      )}
    >
      <Input
        placeholder={placeholder}
        className={cn(
          "w-full rounded-none !border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0",
          inputClassName,
        )}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <Button
        onClick={onResetSearch}
        size={"icon"}
        variant={"outline"}
        className="h-full rounded-none border-none px-3 text-neutral-400"
      >
        {defaultValue ? (
          <XIcon size={22} weight="bold" />
        ) : (
          <MagnifyingGlassIcon size={22} weight="bold" />
        )}
      </Button>
    </div>
  );
}
