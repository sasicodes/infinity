import { useState } from "react";
import { ExploreFeed } from "../components/explore/feed";
import { tw } from "../components/ui/tw";
import { CATEGORIES } from "../lib/constants";

export const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("any");
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto px-5 pt-5">
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category}
            className={tw(
              "whitespace-nowrap rounded-full border border-gray-200 px-2 py-px text-neutral-500 text-xs capitalize",
              selectedCategory === category &&
                "border-neutral-900 text-neutral-900"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>
      <ExploreFeed category={selectedCategory} />
    </div>
  );
};
