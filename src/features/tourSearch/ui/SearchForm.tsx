import { SearchIcon } from '@/assets/common';

export default function SearchForm() {
  return (
    <form className="flex items-center relative mx-3">
      <input
        type="text"
        className=" rounded-2xl px-4 py-2 w-full pr-10 shadow-lg"
        ref={node => {
          if (node) {
            node.focus();
          }
        }}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="text-primary-red" />
      </button>
    </form>
  );
}
