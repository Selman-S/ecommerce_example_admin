"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );
 console.log(open);
 

  return (
    <Command className="overflow-visible bg-white">
   <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
          {open && (
            
            <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup >
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
            
      </CommandList>
      )}
    </Command>
  );
};

export default MultiSelect;
