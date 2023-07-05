import { Web3Provider, Signer, Contract, utils } from "zksync-web3";
import { PAYMASTER_CONTRACT_ADDRESS } from "../constants/consts";
import * as ethers from "ethers";

type PaymasterProps = {
    greeterInstance: Contract;
    message: string;
    price: string;
  };

const usePaymaster = async ({ greeterInstance, message, price }: PaymasterProps) => {
    // estimate gasLimit via paymaster
    let gasPrice = ethers.utils.parseEther(price);
    const paramsForFeeEstimation = utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "General",
        innerInput: new Uint8Array(),
      }
    );

    // estimate gasLimit via paymaster
    const gasLimit = await greeterInstance.estimateGas.setGreeting(
        message,
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paramsForFeeEstimation,
        },
      }
    );
   // const fee = gasPrice.mul(gasLi    mit.toString());
    const paymasterParams = utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "General",
        // empty bytes as testnet paymaster does not use innerInput
        innerInput: new Uint8Array(),
      }
    );

    return {
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: ethers.BigNumber.from(0),
      gasLimit,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    };
  };

  export default usePaymaster;