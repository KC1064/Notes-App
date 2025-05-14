import React, { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  const editNote = () => {};

  const addNote = () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("No Title Found");
      return;
    }

    if (!content) {
      setError("No Content Found");
      return;
    }
    setError("");

    if (type == "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="realtive">
      <MdClose
        onClick={onClose}
        className="absolute right-24 text-lg text-slate-400 hover:text-black"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">TITLE</label>
        <input
          type="text"
          className=" text-lg text-slate-950 outline-none bg-slate-50 p-2 rounded-2xl"
          placeholder="Meeting at 5 pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm text-slate-400">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-2xl"
          placeholder="Write your content here"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <div className="text-sm text-slate-400">TAGS</div>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error message display */}
      {error && (
        <div className="text-red-500 text-sm font-medium mt-2">{error}</div>
      )}

      <button
        onClick={handleAddNote}
        className="font-medium mt-5 p-2 hover:bg-transparent w-[20%] rounded cursor-pointer hover:text-blue-600 border-blue-600 border bg-blue-500 text-white text-lg"
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNotes;
