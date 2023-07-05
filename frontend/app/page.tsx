"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Input from "./components/Input";
import Text from "./components/Text";
import Greeting from "./components/GreeterMessage";
import useWeb3 from "./hooks/useWeb3";
import { Contract } from "zksync-web3";
import { GREETER_ADDRESS, GREETER_CONTRACT_ABI } from "./constants/consts";

export default function Home() {
  const { provider, signer, setProvider, setSigner } = useWeb3();
  // State variables
  const [greeterContractInstance, setGreeterContractInstance] =
    useState<Contract | null>(null);
  const [greeting, setGreetingMessage] = useState<string>("");

  // Handler for setting Greeter contract address
  useEffect(() => {
    const handleGreeterMessage = async () => {
      if (provider && signer) {
        const greeterContract = new Contract(
          GREETER_ADDRESS,
          GREETER_CONTRACT_ABI,
          signer
        );

        setGreeterContractInstance(greeterContract);

        const fetchedGreeting = await greeterContract.greet();
        setGreetingMessage(fetchedGreeting);
      }
    };

    handleGreeterMessage();
  }, [provider, signer]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-52">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum
        luctus felis, at maximus risus lacinia quis. Pellentesque congue diam
        sed urna egestas, in fermentum urna iaculis. Morbi facilisis nec felis
        vel pretium.{" "}
      </Text>
      <Greeting greeting={greeting} />
      <Input
        greeterInstance={greeterContractInstance}
        setGreetingMessage={setGreetingMessage}
        provider={provider}
      />
      <div className="mb-12"></div>
    </main>
  );
}
