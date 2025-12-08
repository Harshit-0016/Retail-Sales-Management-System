import { useState, useRef, useEffect } from "react";

export default function Dropdown({ label, children, width = "w-56" }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  const btnRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!btnRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleDropdown = () => {
    if (!open) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 6, 
        left: rect.left,
      });
    }
    setOpen(!open);
  };

  return (
    <>
      
      <button
        ref={btnRef}
        onClick={toggleDropdown}
        className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
      >
        {label} <span className="text-[10px]">▼</span>
      </button>

      {open && coords && (
        <div
          style={{
            top: coords.top,
            left: coords.left,
          }}
          className={`fixed z-\[9999\] ${width} rounded-lg border border-gray-200 bg-white p-3 shadow-xl`}
        >
          {children}
        </div>
      )}
    </>
  );
}
