import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { LicenseTerms } from "@story-protocol/core-sdk";
import { Code, RefreshCcw } from "lucide-react";
import { toHex, zeroAddress } from "viem";
import {
  ContentStandard,
  PIL_PDF_URI,
  WEBSITE_URL
} from "../../../lib/constants";
import { useStoryClient } from "../../../lib/hooks/use-story";
import { uploadJsonToR2 } from "../../../lib/upload";
import { Button } from "../../ui/button";
import { Loader } from "../loader";

interface GenerateContentProps {
  completion?: string;
  generated?: string;
  streaming: boolean;
  regenerate: () => void;
}

const injectStyles = (content: string) => {
  const styles = `
    <style>
      html, body {
        transform: scale(0.7);
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
      }
    </style>
  `;
  return content.replace("</head>", `${styles}</head>`);
};

export const GenerateContent = ({
  completion,
  generated,
  streaming,
  regenerate
}: GenerateContentProps) => {
  if (streaming) {
    return <Loader />;
  }
  const story = useStoryClient();
  const { user } = useDynamicContext();

  const content = completion || generated || "";
  const contentWithStyles = injectStyles(content);

  const onPost = async () => {
    if (!story) {
      return;
    }

    const offchainData = {
      territory: [],
      channelsOfDistribution: [],
      attribution: true,
      contentStandards: [
        ContentStandard.NO_HATE,
        ContentStandard.SUITABLE_FOR_ALL_AGES,
        ContentStandard.NO_DRUGS_OR_WEAPONS,
        ContentStandard.NO_PORNOGRAPHY
      ],
      sublicensable: false,
      aiLearningModels: false,
      restrictionOnCrossPlatformUse: false,
      governingLaw: "California, USA",
      additionalParameters: {},
      PILUri: PIL_PDF_URI,
      name: "license-off-chain-data"
    };

    const offchainDataUrl = await uploadJsonToR2(JSON.stringify(offchainData));

    const metadata = {
      name: `Post by ${user?.username}`,
      description: content,
      external_url: `${WEBSITE_URL}/u/${user?.username}`,
      mediaType: "text/html"
      // image: "",
      // attributes: [],
      // mediaUrl: "",
      // mediaHash: "",
      // animation_url: "",
      // creators: []
    };

    const metadataUrl = await uploadJsonToR2(JSON.stringify(metadata));

    const commercialRemixTerms: LicenseTerms = {
      transferable: true,
      royaltyPolicy: "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E", // RoyaltyPolicyLAP address from https://docs.story.foundation/docs/deployed-smart-contracts
      defaultMintingFee: 0n,
      expiration: 0n,
      commercialUse: true,
      commercialAttribution: true,
      commercializerChecker: zeroAddress,
      commercializerCheckerData: zeroAddress,
      commercialRevShare: 10, // can claim 50% of derivative revenue
      commercialRevCeiling: 0n,
      derivativesAllowed: true,
      derivativesAttribution: true,
      derivativesApproval: false,
      derivativesReciprocal: true,
      derivativeRevCeiling: 0n,
      currency: "0x1514000000000000000000000000000000000000", // $WIP address from https://docs.story.foundation/docs/deployed-smart-contracts
      uri: offchainDataUrl
    };

    const response = await story.ipAsset.mintAndRegisterIpAssetWithPilTerms({
      spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
      licenseTermsData: [
        {
          terms: commercialRemixTerms,
          licensingConfig: {
            isSet: false,
            mintingFee: 0,
            licensingHook: zeroAddress,
            hookData: zeroAddress,
            commercialRevShare: 0,
            disabled: false,
            expectMinimumGroupRewardShare: 0,
            expectGroupRewardPool: zeroAddress
          }
        }
      ],
      ipMetadata: {
        ipMetadataURI: metadataUrl,
        ipMetadataHash: toHex("", { size: 32 }),
        nftMetadataHash: toHex("", { size: 32 }),
        nftMetadataURI: metadataUrl
      }
    });
    console.info(
      `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
    );
  };

  return (
    <div className="relative">
      <div className="-mt-6 -ml-3 absolute flex items-center gap-1">
        <span className="scale-50 cursor-move font-mono text-gray-500 text-xs uppercase">
          Generated
        </span>
        <div className="-mt-px flex items-center gap-1">
          <button
            title="Copy Code"
            type="button"
            className="scale-50 cursor-pointer font-mono text-gray-500 text-xs uppercase"
            onClick={() => {
              navigator.clipboard.writeText(content);
            }}
          >
            <Code className="size-3" />
          </button>
          <button
            title="Regenerate"
            type="button"
            className="scale-50 cursor-pointer font-mono text-gray-500 text-xs uppercase"
            onClick={regenerate}
          >
            <RefreshCcw className="size-3" />
          </button>
        </div>
      </div>
      <div className="-mt-7 -mr-3 absolute right-0">
        <Button
          type="button"
          size="xs"
          className="scale-50 px-4"
          onClick={onPost}
        >
          Post
        </Button>
      </div>
      <iframe
        srcDoc={contentWithStyles}
        title="Generated content"
        className="h-full w-full overflow-hidden rounded-lg border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
