// import web3 from "../web3";
import ABI from "../abi/lottoAbi.json";
import WalletConnectProvider from "@walletconnect/web3-provider";

const Web3 = require("web3");

export const contractAddress = "0x2105F99c18059BF922bF054970eB3eA23FE15faE";

async function ContratInterface(walletType) {
  let web3;

  if (walletType === "Trust_wallet") {
    const provider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed1.binance.org"
        // 56: "https://speedy-nodes-nyc.moralis.io/1d19a6082204e3ecd8dcf0b9/bsc/mainnet",
      }
    });
    await provider.enable();

    web3 = new Web3(provider);
    return new web3.eth.Contract(ABI.abi, contractAddress);
  } else if (walletType === "Metamask") {
    web3 = new Web3(Web3.givenProvider);
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://bsc-dataseed1.binance.org"
    );
    web3 = new Web3(provider);
  }

  return new web3.eth.Contract(ABI.abi, contractAddress);
}

export default ContratInterface;
