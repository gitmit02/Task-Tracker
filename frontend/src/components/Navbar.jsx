import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const initial = user?.username?.charAt(0).toUpperCase() || "?";

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[15px] font-bold text-white">
            T
          </div>
          <span className="text-[16px] font-bold text-ink">Task Tracker</span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-paper sm:pr-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[14px] font-bold text-accent">
              {initial}
            </div>
            <span className="hidden text-[14px] font-medium text-ink sm:inline">
              {user?.username}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className={`hidden text-ink-soft transition-transform sm:inline-block ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
              <div className="border-b border-line px-4 py-3 sm:hidden">
                <p className="text-[14px] font-semibold text-ink">{user?.username}</p>
                <p className="text-[12px] text-ink-soft">Signed in</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] font-medium text-high transition hover:bg-paper"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 6V4.5C13 3.7 12.3 3 11.5 3H5.5C4.7 3 4 3.7 4 4.5V15.5C4 16.3 4.7 17 5.5 17H11.5C12.3 17 13 16.3 13 15.5V14M8.5 10H17M17 10L14.5 7.5M17 10L14.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}