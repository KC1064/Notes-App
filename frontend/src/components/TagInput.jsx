import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addTag = () => {
    if (input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-slate-300/30 text-slate-500 px-2 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
                className="hover:text-red-600"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded"
          placeholder="Add Tags"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={() => {
            addTag();
          }}
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-400"
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
