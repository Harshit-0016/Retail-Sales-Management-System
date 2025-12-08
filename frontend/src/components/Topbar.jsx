export default function Topbar({ user }) {
  const fullName = user?.fullName || "Guest User";
  const avatarLetter = fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      
      <div className="text-sm font-medium text-gray-600"></div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          🔔
        </button>
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          {fullName}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
          {avatarLetter}
        </div>
      </div>
    </header>
  );
}
