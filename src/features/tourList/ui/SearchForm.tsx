export default function SearchForm() {
  return (
    <form className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-l px-4 py-2"
      />
      <button className="bg-blue-500 text-white rounded-r px-4 py-2">
        Search
      </button>
    </form>
  );
}
