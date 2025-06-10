import { porto } from "porto/wagmi";
import { http, createConfig, createStorage } from "wagmi";
import { story, storyAeneid } from "wagmi/chains";

export const config = createConfig({
  connectors: [porto()],
  chains: [story, storyAeneid],
  storage: createStorage({
    storage: localStorage
  }),
  transports: {
    [story.id]: http(),
    [storyAeneid.id]: http()
  }
});
