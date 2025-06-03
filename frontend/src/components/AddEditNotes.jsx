import React, { useState, useEffect } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const AddEditNotes = ({ data, type, getNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) {
      setTitle(data.title || "");
      setContent(data.content || "");
      setTags(data.tags || []);
    }
  }, [data, type]);

  const addNote = async () => {
    console.log("Trying to add note with data:", { title, content, tags });

    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      console.log("Add note response:", response.data);

      if (response.data && !response.data.error) {
        await getNotes(); // ensures fresh data is loaded
        onClose();
      } else {
        setError(response.data.message || "Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add note. Please try again.");
      }
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${data._id}`, {
        title,
        content,
        tags,
      });

      console.log("Edit note response:", response.data);

      if (response.data && !response.data.error) {
        await getNotes();
        onClose();
      } else {
        setError(response.data.message || "Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update note. Please try again.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title.trim()) {
      setError("No Title Found");
      return;
    }

    if (!content.trim()) {
      setError("No Content Found");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNote();
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg">
      <MdClose
        onClick={onClose}
        className="absolute right-4 top-4 text-xl text-slate-400 hover:text-black cursor-pointer"
      />

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm text-slate-400">TITLE</label>
        <input
          type="text"
          className="text-lg text-slate-950 outline-none bg-slate-50 p-2 rounded-2xl"
          placeholder="Meeting at 5 pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm text-slate-400">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded-2xl"
          placeholder="Write your content here"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-slate-400">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <div className="text-red-500 text-sm font-medium mb-4">{error}</div>
      )}

      <button
        onClick={handleAddNote}
        className="font-medium px-4 py-2 w-[30%] rounded cursor-pointer border border-blue-600 bg-blue-500 text-white hover:bg-transparent hover:text-blue-600 text-lg"
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
