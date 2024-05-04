"use client"
import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (item: string) => void;
  onRemove: (itemRemove: string) => void;
}

const MultiText = ({
  placeholder,
  value,
  onChange,
  onRemove,
}: MultiTextProps) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item,index) => (
          <Badge key={index} className="bg-grey-1 text-white">{item}
          <button className="ml-1 rounded-full outline-none hover:bg-red-1 p-1"  onClick={()=> onRemove(item)}><X className="h-3 w-3" /></button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
