import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../components/AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Home = () => {
  const [openAddEditModal, SetOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setShowToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const getUserInfor = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      console.log(response.data["user"]);

      setUserInfo(response.data["user"]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log("Fetched notes response:", response.data); // Debug log

      if (
        response.data &&
        !response.data.error &&
        Array.isArray(response.data.notes)
      ) {
        setNotes(response.data.notes);
      } else {
        console.error("Invalid notes data received:", response.data);
        setNotes([]);
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
      setNotes([]);
    }
  };

  const pinNote = async (noteId, isPinned) => {
    try {
      const response = await axiosInstance.put(`/pin-note/${noteId}`, {
        isPinned: !isPinned,
      });

      console.log("Pin note response:", response.data);

      if (response.data && !response.data.error) {
        await getNotes();
      }
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  const handleCloseToast = () => {
    setShowToast({
      isShown: false,
      message: "",
    });
  };

  const showToastMessage = (message, type) => {
    setShowToast({
      isShown: true,
      message,
      type,
    });
  };

  const deleteNote = async (noteID) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteID}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        await getNotes();
      } else {
        showToastMessage(
          response.data.message || "Failed to delete note",
          "error"
        );
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      if (error.response?.data?.message) {
        showToastMessage(error.response.data.message, "error");
      } else {
        showToastMessage("Failed to delete note. Please try again.", "error");
      }
    }
  };

  const searchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-note", {
        params: { query },
      });

      console.log("Search response:", response.data);

      if (response.data && !response.data.error && Array.isArray(response.data.notes)) {
        setIsSearching(true);
        setNotes(response.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error searching notes:", error);
      setNotes([]);
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    getNotes();
  };

  useEffect(() => {
    getUserInfor();
    getNotes();
    return () => {
      setUserInfo(null);
      setNotes([]);
    };
  }, []);

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        searchNote={searchNote} 
        onClearSearch={clearSearch}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-4 ml-4">
          {notes.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 mt-8">
              {isSearching ? "No notes found matching your search" : "No notes found"}
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(note.createdAt).toLocaleDateString()}
                content={note.content}
                tags={note.tags?.join(", ")}
                isPinned={note.isPinned}
                onEdit={() =>
                  SetOpenModal({ isShown: true, type: "edit", data: note })
                }
                onDelete={() => {
                  deleteNote(note._id);
                }}
                onPinNote={() => pinNote(note._id, note.isPinned)}
              />
            ))
          )}
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
          getNotes={getNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
