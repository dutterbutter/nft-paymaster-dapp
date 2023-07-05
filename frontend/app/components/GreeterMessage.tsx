// import { useState, useEffect } from "react";
// import { Web3Provider, Signer, Contract } from "zksync-web3";
// import { GREETER_ADDRESS, GREETER_CONTRACT_ABI } from "../constants/consts";

type GreetingProps = {
    greeting: string;
};

const Greeting = ({ greeting }: GreetingProps) => {
    // const [greeterContractInstance, setGreeterContractInstance] = useState<Contract | null>(null);
    // const [greeting, setGreeting] = useState<string>("");

    // // Handler for setting Greeter contract address
    // useEffect(() => {
    //     const handleGreeterMessage = async () => {
    //         if (provider && signer) {
    //             const greeterContract = new Contract(
    //                 GREETER_ADDRESS,
    //                 GREETER_CONTRACT_ABI,
    //                 signer,
    //             );

    //             setGreeterContractInstance(greeterContract);

    //             const fetchedGreeting = await greeterContract.greet();
    //             setGreeting(fetchedGreeting);
    //         }
    //     };

    //     handleGreeterMessage();
    // }, [provider, signer]);

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-4">Greeter says:</h1>
            <p className="text-base text-center">{greeting} 👋</p>
        </div>
    );
};

export default Greeting;