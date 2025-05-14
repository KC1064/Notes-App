import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../components/AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, SetOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <NoteCard
            title={"Task 1"}
            date={"15th June 2025"}
            content={"Something to Do"}
            tags={"#Meeting"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"Task 2"}
            date={"16th June 2025"}
            content={"Another Task"}
            tags={"#Work"}
            isPinned={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-300 absolute right-10 bottom-10"
        onClick={() =>
          SetOpenModal({
            isShown: true,
            type: "add",
            data: null,
          })
        }
      >
        <MdAdd className="text-[32px] text-black" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          SetOpenModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add or Edit Note Modal"
        className="max-w-xl w-full bg-white rounded-xl p-6 mx-auto mt-20 shadow-lg"
      >
        <AddEditNotes
          onClose={() =>
            SetOpenModal({ isShown: false, type: "add", data: null })
          }
          type={openAddEditModal.type}
          data={openAddEditModal.data}
        />
      </Modal>
    </>
  );
};

export default Home;
