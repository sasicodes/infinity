import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { storyAeneid } from "wagmi/chains";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [storyAeneid],
  multiInjectedProviderDiscovery: false,
  transports: {
    [storyAeneid.id]: http()
  }
});

const DynamicWagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DynamicContextProvider
      settings={{
        appName: "Infinity",
        environmentId: import.meta.env.VITE_DYNAMIC_ENV_ID,
        walletConnectors: [
          ZeroDevSmartWalletConnectors,
          EthereumWalletConnectors
        ],
        social: {
          strategy: "popup"
        }
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export { DynamicWagmiProvider };
