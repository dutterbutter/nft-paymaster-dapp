'use client'

import { useState, useEffect } from "react";
import { Web3Provider, Signer, Contract } from "zksync-web3";

type GreeterData = {
  provider: Web3Provider | null;
  signer: Signer | null;
  greeterContractInstance: Contract | null;
  setProvider: React.Dispatch<React.SetStateAction<Web3Provider | null>>;
  setSigner: React.Dispatch<React.SetStateAction<Signer | null>>;
  setGreeterContractInstance: React.Dispatch<React.SetStateAction<Contract | null>>;
};

const useGreeter = (): GreeterData => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [greeterContractInstance, setGreeterContractInstance] =
  useState<Contract | null>(null);

  useEffect(() => {
    const setupGreeter= async () => {
      if ((window as any).ethereum) {
        const provider = new Web3Provider((window as any).ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts", []);

        const networkVersion = await provider
          .getNetwork()
          .then((network) => network.chainId);
        if (networkVersion !== 280) {
          alert("Please switch to the zkSync Testnet to use this application.");
          return;
        }

        const signerInstance = provider.getSigner();
        setSigner(signerInstance);
      }
    };

    setupGreeter();
  }, []);

  return {
    greeterContractInstance,
    setGreeterContractInstance,
  };
};

export default useGreeter;
