// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
// import { PlusIcon, LogOutIcon } from "lucide-react";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";
import { UseAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user, logout } = UseAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch notes");
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = () => {
  //   logout();
  //   toast.success("Logged out successfully");
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FF9D]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          {user && <p className="text-gray-400">Welcome, {user.username}!</p>}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/create" className="btn btn-primary">
            <PlusIcon className="size-5" />
            New Note
          </Link>

          <button onClick={handleLogout} className="btn btn-ghost text-white hover:text-error" title="Logout">
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div> */}
      <NavBar/>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center py-16 mx-auto">
          <p className="text-gray-400 text-lg mb-4">No notes yet</p>
          <Link to="/create" className="btn btn-primary">
            Create Your First Note
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
