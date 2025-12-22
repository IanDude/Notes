import { Link } from "react-router";
import { PlusIcon, LogOut } from "lucide-react";

const NavBar = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Notes</h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary hover:-translate-y-0.5">
              <PlusIcon />
              <span>New Note</span>
            </Link>
            {/* <button onClick={handleLogout} className="btn btn-ghost hover:-translate-y-0.5">
              <LogOut />
              <span>Logout</span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
