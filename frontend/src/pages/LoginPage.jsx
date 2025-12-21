import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import { saveToken } from "../lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const res = await api.post(endpoint, { email, password });
      saveToken(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit} className="form-control bg-base-300 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-4">{isRegister ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full btn btn-primary text-white p-2 rounded">
          {isRegister ? "Sign Up" : "Login"}
        </button>
        <button type="button" onClick={() => setIsRegister(!isRegister)} className="w-full mt-2 text-accent text-sm">
          {isRegister ? "Already have an account? Login" : "Need an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}
