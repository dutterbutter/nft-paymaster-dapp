import { Disclosure } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Text from "./Text";
import { Web3Provider, Signer, Contract } from "zksync-web3";

const subtotal = "setGreeting";
const discount = { code: "MIND STONE", amount: "FREE GAS" };
const taxes = ".001";
const shipping = ".00001";
const total = ".006";

type CheckoutProps = {
    greeterInstance: Contract;
    message: string;
    setGreetingMessage: React.Dispatch<React.SetStateAction<string>>;
    cost: string;
    price: string;
    gas: string;
};

type GreeterData = {
    message: string;
}

export default function Checkout({ greeterInstance, message, setGreetingMessage, cost, price, gas }: CheckoutProps) {
  // Updates greeting on the contract
  const updateGreeting = async ({message} : GreeterData) => {
    try {
    //   let txHandle;
    //   if (params) {
    //     txHandle = await greeterInstance.setGreeting(
    //       newGreeting,
    //       params,
    //     );
    //   } else {
    //     txHandle = await greeterInstance.setGreeting(newGreeting);
    //   }
      const txHandle = await greeterInstance.setGreeting(message);
      // Wait until the transaction is committed
      await txHandle.wait();
      // Set transaction details
      //   setTxDetails(txHandle.hash);

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
        {/* Order summary */}
        <section
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <h2 id="summary-heading" className="text-black text-center" >
            Transaction Details
          </h2>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="mt-4 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Transaction: </dt>
                <dd className="text-gray-900">{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {discount.code}
                  </span>
                </dt>
                <dd className="text-gray-900">-{discount.amount}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Transaction Fee (Gas Cost): </dt>
                <dd className="text-gray-900">{gas} ETH</dd>
              </div>
              <div className="flex justify-between">
                <dt>Gas Price: </dt>
                <dd className="text-gray-900">{price} ETH</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total Cost: </dt>
                <dd className="text-base">{cost} ETH</dd>
              </div>
            </dl>
            <button
              type="submit"
              onClick={() => updateGreeting({message})}
              className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change Greeting {total}
            </button>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0 bg-white border-2 border-black"
        >
          <div className="mx-auto max-w-lg">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              bibendum luctus felis, at maximus risus lacinia quis.
            </Text>

            <div className="my-8 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              bibendum luctus felis, at maximus risus lacinia quis.
            </Text>
          </div>
        </section>
      </main>
    </>
  );
}
