import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { UseAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully!");
  };

  return (
    // <header className="bg-base-300 border-b border-base-content/10">
    <header className="flex justify-between items-center mb-8">
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
    </header>
  );
};

export default NavBar;
