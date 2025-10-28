import { validateJson } from "@/utils/json-parser";
import { useState } from "react";
import { toast } from "sonner";

interface JsonInputProps {
  onGenerate: (jsonData: any) => void;
  onClear: () => void;
}

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    {"name": "item1"},
    {"name": "item2"}
  ]
}`;

export const JsonInput = ({ onGenerate, onClear }: JsonInputProps) => {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string>("");

  const handleGenerate = () => {
    setError("");
    const validation = validateJson(jsonText.trim());

    if (!validation.valid) {
      setError(validation.error || "Invalid JSON");
      toast.error("Invalid JSON format", {
        description: validation.error,
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonText.trim());
      onGenerate(parsed);
      toast.success("Tree generated successfully!");
    } catch (err) {
      setError("Failed to parse JSON");
      toast.error("Failed to parse JSON");
    }
  };

  const handleClear = () => {
    setJsonText("");
    setError("");
    onClear();
    toast.info("Input cleared");
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-sm font-medium">Paste or type JSON data</label>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="Enter JSON here..."
          className="flex-1 p-2 border text-sm resize-none min-h-[400px]"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          className="flex-1 cursor-pointer p-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-500"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="cursor-pointer p-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
