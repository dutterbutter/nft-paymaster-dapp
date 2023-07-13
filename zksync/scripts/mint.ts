const { Provider, Wallet, Contract } = require("zksync-web3");
const ContractArtifact = require("../artifacts-zk/contracts/ERC721.sol/InfinityStones.json");

// load env file
const dotenv = require("dotenv");
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = "e567ef46a79037a72fc1e564294ab8d4dedc2794878c9a0b72e67c74163e4174";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// load wallet private key and deployed contract address from env file
const RECIPIENT_ADDRESS = "0x6544fe5dcC0AF5ef544c3b810Cc115Dc7c5A3321"
const CONTRACT_ADDRESS =  "0xA394e861f427BE8B496fa905C3C29CE0A3dA3479";

if (!PRIVATE_KEY || !RECIPIENT_ADDRESS || !CONTRACT_ADDRESS)
  throw "⛔️ Env variables are not set!";

const provider = new Provider('https://zksync2-testnet.zksync.dev');
const signer = new Wallet(PRIVATE_KEY, provider);

// Connect to the contract
const contract = new Contract(CONTRACT_ADDRESS, ContractArtifact.abi, signer);

async function mintNFT() {
  const stone = "Reality Stone";  
  // Mint NFTs to the recipient address
  const tx = await contract.mint(RECIPIENT_ADDRESS, stone);
  await tx.wait();
  console.log(`The ${stone} has been given to ${RECIPIENT_ADDRESS}`);

  // Get and log the balance of the recipient
  const balance = await contract.balanceOf(RECIPIENT_ADDRESS);
  console.log(`Balance of the recipient: ${balance}`);
}

mintNFT().catch(console.error);
