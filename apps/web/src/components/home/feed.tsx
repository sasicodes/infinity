import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../lib/sync";
import { Loader } from "../imagine/loader";
import { Button } from "../ui/button";
import { Item } from "./item";
import type { Post } from "./type";

export const Feed = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) => getAllPosts(pageParam),
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

  return (
    <div className="flex flex-col divide-y divide-neutral-200">
      {data?.pages.map((page) =>
        page.posts.map((post: Post) => <Item key={post.id} post={post} />)
      )}
      <div className="flex items-center justify-center py-6">
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more posts"}
          </Button>
        )}
      </div>
    </div>
  );
};
