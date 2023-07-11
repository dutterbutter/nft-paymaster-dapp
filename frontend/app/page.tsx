"use client";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Input from "./components/Input";
import Text from "./components/Text";
import Greeting from "./components/GreeterMessage";
import WalletButton from "./components/WalletButton";
import Web3Context from "./context/Web3Context";
import zkSyncImage from "./assets/zkSync_logo.png";
// import Table from "./components/Table";

export default function Home() {
  const web3Context = useContext(Web3Context);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-52">
      <WalletButton />
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
      <Greeting greeting={web3Context.greeting} />
      <Input
        greeterInstance={web3Context.greeterContractInstance}
        setGreetingMessage={web3Context.setGreetingMessage}
        //setMessages={web3Context.setMessages}
        provider={web3Context.provider}
        nfts={web3Context.nfts}
      />
      {/* <div className="mt-8 font-bold text-center text-2xl">
        Message Board
      </div> */}
      {/* <Table messages={web3Context.messages}/> */}
    </main>
  );
}
