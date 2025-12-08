export default function Sidebar({ user }) {
  const username = user?.username || "User";
  const fullName = user?.fullName || "Guest User";
  const avatarLetter = fullName?.charAt(0)?.toUpperCase() || "U";

  const menuBlocks = [
    {
      title: "Menu",
      items: ["Dashboard", "Nexus", "Intake"],
      active: "Dashboard",
    },
    {
      title: "Services",
      items: ["Pre-active", "Active", "Blocked", "Closed"],
      active: "Active",
    },
    {
      title: "Invoices",
      items: ["Proforma Invoices", "Final Invoices"],
      active: "Proforma Invoices",
    },
  ];

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-gray-200 bg-white px-4 py-5 shadow-sm md:block">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">{username}</div>
          <div className="text-xs text-gray-500">{fullName}</div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
          {avatarLetter}
        </div>
      </div>

      {menuBlocks.map((block) => (
        <div key={block.title} className="mb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {block.title}
          </p>
          <ul className="space-y-1">
            {block.items.map((item) => {
              const isActive = item === block.active;
              return (
                <li key={item}>
                  <button
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
