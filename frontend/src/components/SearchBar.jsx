export default function SearchBar({ value = "", onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center rounded-lg bg-gray-100 px-3 py-2 shadow-sm"
    >
      <span className="mr-2 text-gray-500">🔍</span>
      <input
        type="text"
        placeholder="Name, Phone no."
        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </form>
  );
}
