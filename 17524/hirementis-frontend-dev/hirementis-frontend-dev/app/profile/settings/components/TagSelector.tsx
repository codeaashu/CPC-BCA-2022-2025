import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagSelector = ({ selectedTags, onTagsChange }: TagSelectorProps) => {
  const [inputValue, setInputValue] = useState("");

const suggestedTags = [ 
  "React",
  "HTML",
  "Next.js",
  "Node.js",
  "Python",
  "C++",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "Linux",
  "MySQL",
  "MongoDB",
  "TypeScript",
  "Express.js",
  "Java",
  "Spring Boot",
  "Flutter",
  "TensorFlow",
  "Firebase",
  "Angular",
  "Vue.js",
  "Rust",
  "PostgreSQL",
  "Django",
  "Laravel",
  "Redis",
  "GraphQL",
  "LLMs",
  "Swift",
];


  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !selectedTags.includes(trimmedTag) &&
      selectedTags.length < 10
    ) {
      onTagsChange([...selectedTags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleAddTag = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  const availableSuggestions = suggestedTags.filter(
    (tag) => !selectedTags.includes(tag)
  );

  return (
    <div className="space-y-4">
      {/* Custom Tag Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill or interest..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleInputKeyPress}
            className="rounded-lg"
            disabled={selectedTags.length >= 10}
          />
          <Button
            onClick={handleAddTag}
            variant="outline"
            size="sm"
            disabled={!inputValue.trim() || selectedTags.length >= 10}
            className="px-3 rounded-lg"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {selectedTags.length}/10 tags selected
        </p>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 bg-green-100 text-green-800 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-green-200 dark:hover:bg-teal-900/50 rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:bg-green-200 dark:hover:bg-teal-800 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Tags */}
      {availableSuggestions.length > 0 && selectedTags.length < 10 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Suggested Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 12).map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addTag(tag)}
                className="px-3 py-1 h-auto text-sm rounded-full hover:bg-green-50 dark:hover:bg-teal-900/20 hover:border-green-300 dark:hover:border-teal-600"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
