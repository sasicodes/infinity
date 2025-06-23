import { StoryClient } from "@story-protocol/core-sdk";
import { aeneid } from "@story-protocol/core-sdk";
import { http, useWalletClient } from "wagmi";

export const useStoryClient = () => {
  const { data: walletClient, isLoading } = useWalletClient();
  if (isLoading || !walletClient) {
    return null;
  }
  const config = {
    transport: http("https://aeneid.storyrpc.io"),
    wallet: walletClient,
    chainId: aeneid.id
  };
  return StoryClient.newClientUseWallet(config);
};
