import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { getMyPosts } from "../../lib/sync";
import type { Post } from "../home/type";
import { Loader } from "../imagine/loader";
import { Button } from "../ui/button";
import { Item } from "./item";

export const MyPostsFeed = () => {
  const navigate = useNavigate();
  const { user } = useDynamicContext();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", "me", user?.username],
      queryFn: ({ pageParam }) => getMyPosts(pageParam),
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
        <Loader iconClassName="size-4" />
      </div>
    );
  }

  const onCreateFlow = () => {
    const uuid = uuidv4();
    navigate(`/imagine/${uuid}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 px-6 pt-5 pb-1">
        <div className="font-medium text-sm">Posts</div>
        {data?.pages[0]?.pagination.total > 0 && (
          <div className="text-neutral-500 text-sm">
            ({data?.pages[0]?.pagination.total})
          </div>
        )}
      </div>
      {data?.pages.map((page) =>
        page.posts.map((post: Post) => <Item key={post.id} post={post} />)
      )}
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
