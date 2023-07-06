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
3. **Deploy Contracts**

   Deploy the `ERC721.sol`, `Greeter.sol`, and `ERC721GatedPaymaster.sol` contracts:

   ```
   yarn deploy:contracts
   ```

   **Important:** During the deployment process, you will be prompted to provide a Recipient Address. This is the address where the newly minted NFT will be sent.

   This will run the deployment scripts in `/zksync/deploy`.

4. **Serve the User Interface**

   Excellent! Now that our contracts are deployed, we can serve up the user interface and interact with these contracts. To do so:

   ```
   yarn serve:ui
   ```

   This command starts the Next.js server on `localhost:3000`.

## Useful Commands 💻

Here are some handy commands to get you started:

- `yarn compile:contracts`: Compiles the contracts.
- `yarn deploy:contracts`: Deploys all contracts.
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
