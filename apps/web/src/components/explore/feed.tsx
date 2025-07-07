import { useInfiniteQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { getPostsByCategory } from "../../lib/sync";
import type { Post } from "../home/type";
import { Loader } from "../imagine/loader";
import { Button } from "../ui/button";
import { Item } from "./item";

export const ExploreFeed = ({ category }: { category: string }) => {
  const navigate = useNavigate();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "category", category],
      queryFn: ({ pageParam }) =>
        getPostsByCategory(category.toLowerCase(), pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.page < lastPage.pagination.totalPages) {
          return lastPage.pagination.page + 1;
        }
      }
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader />
      </div>
    );
  }

  const onCreateFlow = () => {
    const uuid = uuidv4();
    navigate(`/imagine/${uuid}`);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-4">
        {data?.pages.map((page) =>
          page.posts.map((post: Post) => <Item key={post.id} post={post} />)
        )}
      </div>
      <div className="flex items-center justify-center py-6">
        {hasNextPage ? (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more posts"}
          </Button>
        ) : (
          <Button size="icon" onClick={onCreateFlow}>
            <PlusIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
