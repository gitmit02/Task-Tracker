import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Enter both username and password.");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await signup(username.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed. Try a different username.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-ink">Create your account</h1>
        <p className="mt-1 text-[14px] text-ink-soft">Start tracking your own tasks.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[13px] font-medium text-ink-soft">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-[13px] font-medium text-ink-soft">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-[13px] font-medium text-ink-soft">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-[15px] text-ink focus:outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-[13px] text-high">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-xl bg-accent px-4 py-2.5 text-[15px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
