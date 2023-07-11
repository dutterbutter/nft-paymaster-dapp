import React from 'react';

import { Contract, Web3Provider, Signer } from "zksync-web3";
import { PowerStoneNft } from "../types/powerStoneNft";
import { TableProps } from "../components/Table";

export interface Web3ContextType {
  greeterContractInstance: Contract | null;
  greeting: string;
  nfts: PowerStoneNft[];
  provider: Web3Provider | null;
  signer: Signer | null;
  // messages: TableProps[];
  setGreeterContractInstance: (instance: Contract | null) => void;
  setGreetingMessage: React.Dispatch<React.SetStateAction<string>>;
  setNfts: (nfts: PowerStoneNft[]) => void;
  setProvider: (provider: Web3Provider | null) => void;
  setSigner: (signer: Signer | null) => void;
  //setMessages: (messages: TableProps[]) => void;
}

export const defaultWeb3State: Web3ContextType = {
  greeterContractInstance: null,
  greeting: '',
  nfts: [],
  provider: null,
  signer: null,
  // messages: [],
  setGreeterContractInstance: () => {},
  setGreetingMessage: () => {},
  setNfts: () => {},
  setProvider: () => {},
  setSigner: () => {},
  //setMessages: () => {},
};

const Web3Context = React.createContext<Web3ContextType>(defaultWeb3State);

export default Web3Context;
