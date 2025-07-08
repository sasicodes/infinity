import {
  Copy,
  Heart,
  IdCard,
  LoaderIcon,
  MessageCircle,
  Repeat,
  Share
} from "lucide-react";
import { useState } from "react";
import type { Address } from "viem";
import { useStoryClient } from "../../lib/hooks/use-story";
import { updatePurchase } from "../../lib/sync";
import { Button } from "../ui/button";
import type { Post } from "./type";

interface ActionsProps {
  post: Post;
}

export const Actions = ({ post }: ActionsProps) => {
  const client = useStoryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const buy = async () => {
    if (!client) {
      return;
    }
    setIsLoading(true);
    const response = await client.license.mintLicenseTokens({
      licenseTermsId: post.licenseTermsId,
      licensorIpId: post.ipId as Address,
      amount: 1,
      maxMintingFee: BigInt(0), // disabled
      maxRevenueShare: 100 // default
    });

    if (response.txHash && response.licenseTokenIds) {
      await updatePurchase(
        post.id,
        response.licenseTokenIds[0].toString(),
        response.txHash
      );
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="!cursor-not-allowed"
          title="Coming soon"
        >
          <Heart className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="!cursor-not-allowed"
          title="Coming soon"
        >
          <MessageCircle className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="!cursor-not-allowed"
          title="Coming soon"
        >
          <Share className="size-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="!cursor-not-allowed"
          title="Coming soon"
        >
          <Repeat className="mr-1.5 size-4" />
          <span>Remix</span>
        </Button>
        {post._count.licenses > 0 || isSuccess ? (
          <Button
            size="icon"
            variant="secondary"
            title="Copy Snippet"
            onClick={() => {
              navigator.clipboard.writeText(post.html);
            }}
          >
            <Copy className="size-3.5" />
          </Button>
        ) : null}
        <Button onClick={buy} disabled={isLoading}>
          {isLoading ? (
            <LoaderIcon className="size-3 animate-spin" />
          ) : (
            <>
              <IdCard className="mr-1.5 size-4" />
              <span>
                Buy {isSuccess || post._count.licenses > 0 ? "again" : ""}
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
