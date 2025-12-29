// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add for registration
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;

      if (isRegister) {
        // Registration
        if (!username.trim()) {
          toast.error("Username is required");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          setLoading(false);
          return;
        }

        result = await register(username, email, password);
      } else {
        // Login
        result = await login(email, password);
      }

      if (result.success) {
        toast.success(isRegister ? "Account created successfully!" : "Logged in successfully!");
        navigate("/");
      } else {
        setError(result.message || "Error");
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setUsername(""); // Clear username when toggling
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form
        onSubmit={handleSubmit}
        className="form-control bg-base-300 p-8 rounded-xl shadow-2xl w-96 backdrop-blur-sm bg-opacity-90"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? "Create Account" : "Welcome Back"}</h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {/* Username field for registration only */}
        {isRegister && (
          <div className="mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
              required={isRegister}
            />
          </div>
        )}

        {/* Email field */}
        <div className="mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder={isRegister ? "At least 6 characters" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {isRegister && (
            <label className="label">
              <span className="label-text-alt">Minimum 6 characters</span>
            </label>
          )}
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-full mb-4" disabled={loading}>
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {isRegister ? "Creating Account..." : "Logging in..."}
            </>
          ) : isRegister ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </button>

        {/* Toggle button */}
        <button type="button" onClick={toggleMode} className="btn btn-ghost w-full text-sm" disabled={loading}>
          {isRegister ? "Already have an account? Login" : "Need an account? Sign Up"}
        </button>

        {/* Demo credentials hint */}
        {!isRegister && (
          <div className="mt-6 p-3 bg-base-200 rounded-lg">
            <p className="text-sm text-center text-base-content/70">Demo: test@example.com / password123</p>
          </div>
        )}
      </form>
    </div>
  );
}
