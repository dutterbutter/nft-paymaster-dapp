import Image from "next/image";
import Text from "./Text";
import { Contract } from "zksync-web3";
import usePaymaster from "../hooks/usePaymaster";
import zkSyncImage from "../assets/zkSync_logo.png";

const method = "setGreeting";
// TODO: update to use NFT metadata
const nft = { name: "MIND STONE", amount: "FREE" };

type CheckoutProps = {
  greeterInstance: Contract | null;
  message: string;
  setGreetingMessage: React.Dispatch<React.SetStateAction<string>>;
  cost: string;
  price: string;
  gas: string;
  hasNFT: boolean;
};

type GreeterData = {
  message: string;
};

export default function Checkout({
  greeterInstance,
  message,
  setGreetingMessage,
  cost,
  price,
  gas,
  hasNFT,
}: CheckoutProps) {
  // Updates greeting on the contract
  const updateGreeting = async ({ message }: GreeterData) => {
    try {
      let txHandle;
      if (hasNFT) {
        const params = await usePaymaster({ greeterInstance, message, price });
        txHandle = await greeterInstance.setGreeting(message, params);
      } else {
        txHandle = await greeterInstance.setGreeting(message);
      }

      // Wait until the transaction is committed
      await txHandle.wait();
      // Set transaction details
      // setTxDetails(txHandle.hash);

      // Update greeting
      const updatedGreeting = await greeterInstance.greet();
      setGreetingMessage(updatedGreeting);
    } catch (error) {
      console.error("Failed to update greeting: ", error);
    }
  };

  return (
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden mt-8">
        <section className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex justify-between">
          <h2 className="text-black text-center text-2xl mb-2">
            Transaction Details
          </h2>
          <div className="text-black text-center mb-2">
            <Text>
              The details of your transaction are displayed below for your
              convenience.
            </Text>
          </div>
          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="mt-4 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Transaction: </dt>
                <dd className="text-gray-900">{method}</dd>
              </div>
              {hasNFT && (
                <div className="flex justify-between">
                  <dt className="flex">
                    Infinity Stone NFT
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                      {nft.name}
                    </span>
                  </dt>
                  <dd className="text-gray-900">{nft.amount}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Transaction Fee: </dt>
                <dd className="text-gray-900">{gas} ETH</dd>
              </div>
              <div className="flex justify-between">
                <dt>Gas Price: </dt>
                <dd className="text-gray-900">{price} ETH</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">
                  Total Cost{" "}
                  {hasNFT ? (
                    <span className="text-emerald-500">SAVED:</span>
                  ) : (
                    ":"
                  )}
                </dt>
                <dd className="text-base">{cost} ETH</dd>
              </div>
            </dl>
            <button
              type="submit"
              onClick={() => updateGreeting({ message })}
              className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change Greeting {hasNFT ? "FREE" : cost + " ETH"}
            </button>
          </div>
        </section>

        {/* NFT display */}
        <section className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0 bg-white justify-between">
          <div className="mx-auto max-w-lg mt-12">
            {hasNFT ? (
              <Text>
                Congratulations! You own an Infinity Stone NFT. Enjoy gas-free
                transactions, courtesy of Stark Industries Paymaster.
              </Text>
            ) : (
              <Text>
                Unfortunately, you don't own an Infinity Stone NFT. A small gas
                fee will be charged to update the greeting.
              </Text>
            )}
            {/* // TODO: this will be NFT Image  */}
            <div className="mb-8 mt-8">
              <Image
                src={zkSyncImage}
                alt="zkSync Era Logo"
                priority
                width={550}
                height={250}
              />
            </div>
            <Text>
              If you want to learn more about Paymasters on zkSync Era, check
              out our docs for more information{" "}
              <a
                className="text-blue-500"
                href="https://era.zksync.io/docs/reference/concepts/aa.html#paymasters"
              >
                here
              </a>{" "}
              or check out the paymaster-examples{" "}
              <a
                className="text-blue-500"
                href="https://github.com/matter-labs/paymaster-examples"
              >
                repo
              </a>{" "}
              for more ideas!
            </Text>
          </div>
        </section>
      </main>
    </>
  );
}
