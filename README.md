# nft-paymaster-dapp 💥🎉

Experience the magic of paymasters with our simple dApp demonstration! 

⚠️ **Development Alert**: Please bear in mind that none of the contracts in this repository have been audited or thoroughly tested. The contracts are meant to serve as examples and thus, are **not intended for production use**.

The repository gives you a simplified frontend that interacts with smart contracts deployed on the zkSync Era. Notably, users can deploy a Greeter, NFT, and Paymaster contract where users possessing a particular NFT can have their gas fees paid by the paymaster. 🌍

## Repository Structure 🏗️

The repository is divided into two key sections:

- `/zksync`: This is where the smart contracts are located. You'll find `Greeter.sol`,  `ERC721.sol`, and `ERC721GatedPaymaster.sol` within.

- `/frontend`: Here you'll find the frontend developed using React and Next.js. This frontend helps you interact with the smart contracts. 

## Prerequisites 📝

Make sure that you have sufficient funds in your wallet. Also, ensure that the zkSync Testnet is available and that MetaMask is installed. 

Update the `.env-example` in `zksync/` directory with your wallet private key to deploy the contracts.

## Getting Started ⚡

Let's jump right in:

1. **Install Dependencies**

   First off, install the dependencies:

   ```
   yarn install
   ```

2. **Compile Contracts**

   Compile the contracts:

   ```
   yarn compile:contracts
   ```

3. **Deploy Greeter Contract**

   Deploy the `Greeter.sol` contract:

   ```
   yarn deploy:greeter
   ```

   Copy the outputted Greeter contract address and add it to the `frontend/constants/consts.tsx` file: 

   ```
   export const GREETER_ADDRESS = "YOUR-GREETER-ADDRESS";
   ```

4. **Deploy Infinity Stones NFT Contract**

   Before deploying, add the address you want to assign the NFT to. We'll mint an NFT address during deployment. Go to `zksync/deploy/deploy-ERC721.ts` and input your address:

   ```
   const RECIPIENT_ADDRESS = "YOUR-ADDRESS-HERE";
   ```

   Now, deploy the contract:

   ```
   yarn deploy:nft
   ```

   Again, copy the outputted NFT contract address and add it to the `frontend/constants/consts.tsx` file:

   ```
   export const NFT_CONTRACT_ADDRESS = "NFT-CONTRACT-ADDRESS";
   ```

5. **Deploy Paymaster Contract**

   Before deploying, add the address of your NFT contract. Go to `zksync/deploy/deploy-ERC721GatedPaymaster.ts` and input the contract address:

   ```
   const NFT_COLLECTION_ADDRESS = "NFT-CONTRACT-ADDRESS-HERE";
   ```

   Now, deploy the contract:

   ```
   yarn deploy:paymaster
   ```

6. **Serve the User Interface**

   Excellent! Now that our contracts are deployed, we can serve up the user interface and interact with these contracts. To do so:

   ```
   yarn serve:ui
   ```

   This command starts the Next.js server on `localhost:3000`.

## Useful Commands 💻

Here are some handy commands to get you started:

- `yarn compile:contracts`: Compiles the contracts.
- `yarn deploy:greeter`: Deploys `Greeter.sol` contract. Find deployment scripts in the `/contracts/deploy` directory.
- `yarn deploy:nft`: Deploys `ERC721.sol` contract. Deployment scripts are in the `/contracts/deploy` directory.
- `yarn deploy:paymaster`: Deploys `ERC721GatedPaymaster.sol` contract. You can find deployment scripts in the `/contracts/deploy` directory.
- `yarn serve:ui`: Launches the frontend on `localhost:3000`.

## Official Links 🔗

For more information and support, visit our official channels:

- [Website](https://zksync.io/)
- [Documentation](https://v2-docs.zksync.io/dev/)
- [GitHub](https://github.com/matter-labs)
- [Twitter](https://twitter.com/zksync)
- [Discord](https://discord.gg/nMaPGrDDwk)

Jump in, and let's make the most of paymasters together! 🚀
