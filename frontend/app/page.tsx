"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Input from "./components/Input";
import Text from "./components/Text";
import Greeting from "./components/GreeterMessage";
import useWeb3 from "./hooks/useWeb3";
import { Contract } from "zksync-web3";
import zkSyncImage from "./assets/zkSync_logo.png";
import {
  GREETER_ADDRESS,
  GREETER_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
} from "./constants/consts";
import { PowerStoneNft } from "./types/powerStoneNft";

export default function Home() {
  const { provider, signer, setProvider, setSigner } = useWeb3();
  // State variables
  const [greeterContractInstance, setGreeterContractInstance] =
    useState<Contract | null>(null);
  const [greeting, setGreetingMessage] = useState<string>("");
  const [nfts, setNfts] = useState<PowerStoneNft[]>([]);

  // Handler for setting up contracts
  useEffect(() => {
    const initContracts = async () => {
      if (provider && signer) {
        const greeterContract = new Contract(
          GREETER_ADDRESS,
          GREETER_CONTRACT_ABI,
          signer
        );

        setGreeterContractInstance(greeterContract);
        const fetchedGreeting = await greeterContract.greet();
        setGreetingMessage(fetchedGreeting);

        const nftContract = new Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          signer
        );

        const address = await signer.getAddress();
        const balance = await nftContract.balanceOf(address);
        if (balance > 0) {
          let ownedStones: PowerStoneNft[] = [];
          const ownedTokensResponse = await nftContract.tokensOfOwner(address);

          for(let i = 0; i < ownedTokensResponse.length; i++) {
              const tokenId = ownedTokensResponse[i];
              
              const tokenURI = await nftContract.tokenURI(tokenId);
              if (tokenURI == undefined || tokenURI == "") {
                continue;
              }

              // Now fetch the metadata
              const response = await fetch(tokenURI);
              if (!response.ok) {
                continue;
              }

              ownedStones.push(await response.json() as PowerStoneNft);
          }

          setNfts(ownedStones);
        } else {
          setNfts([]);
        }
      }
    };

    initContracts();
  }, [provider, signer]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-52">
      <div className="mb-12">
        <Image
          src={zkSyncImage}
          alt="zkSync Era Logo"
          priority
          width={550}
          height={250}
        />
      </div>
      <div className="mb-8">
      <Text>
        Explore this demonstrative dApp showcasing the key benefits of Paymasters
        on zkSync Era. Enter a message, and discover if you own an Infinity
        Stone NFT. Lucky holders enjoy gas-free transactions, covered by Stark
        Industries paymaster. Give it a try now!
      </Text>
      </div>
      <Greeting greeting={greeting} />
      <Input
        greeterInstance={greeterContractInstance}
        setGreetingMessage={setGreetingMessage}
        provider={provider}
        nfts={nfts}
      />
      <div className="mb-12"></div>
    </main>
  );
}
