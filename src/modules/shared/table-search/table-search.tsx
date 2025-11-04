import React from "react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TableSearch: React.FC<TableSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mt-1.5 mb-3">
      <InputGroup>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default TableSearch;
