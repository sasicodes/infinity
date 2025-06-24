import { CATEGORIES } from "../lib/constants";

export const Explore = () => {
  return (
    <div className="p-5 text-center">
      <div className="flex gap-2 overflow-x-auto">
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category}
            className="whitespace-nowrap rounded-full border border-gray-200 px-2 py-px text-neutral-500 text-xs capitalize"
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
};
