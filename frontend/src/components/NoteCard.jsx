import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-2xl transition-all ease-in ">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-lg font-medium">{title}</h6> 
          <span className="text-sm text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin 
          className={`text-xl cursor-pointer transition-all duration-200 ${isPinned ? "text-blue-600 rotate-45" : "text-slate-500 hover:text-blue-600"}`} 
          onClick={onPinNote} 
        />
      </div>

      <p className="text-sm text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-700 italic">{tags}</div>
        <div className="flex items-center gap-2 justify-end">
            <MdCreate onClick={onEdit} className="hover:text-green-400"/>
            <MdDelete onClick={onDelete} className="hover:text-red-500"/>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

