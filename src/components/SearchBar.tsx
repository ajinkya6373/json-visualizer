import { useState } from "react";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (path: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!searchText.trim()) {
      toast.error("Please enter a search path");
      return;
    }

    const normalizedPath = searchText.trim().startsWith("$")
      ? searchText.trim()
      : `$.${searchText.trim()}`;

    onSearch(normalizedPath);
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="$.user.address.city or items[0].name"
        className="flex p-2 w-full rounded-md border focus:outline-none text-sm"
      />
      <button onClick={handleSearch} className="btn btn-secondary">
        Search
      </button>
    </div>
  );
};
