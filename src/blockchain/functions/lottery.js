import { ethers, providers } from "ethers";
import ABI from "../abi/lottoAbi.json";

let provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.ninicoin.io/"
  // "https://data-seed-prebsc-2-s2.binance.org:8545/"
);

let lottoAddress = "0x8736F863455db2862E8462fbd6b8Bbf2612CeF2C";

let lottoInstance = new ethers.Contract(lottoAddress, ABI, provider);

export const getLottoNumbers = async () => {
  try {
    let currentJackpot = await lottoInstance.CurrentJackpot();
    let countDown = await lottoInstance.getCountDown();
    let myEntries = await lottoInstance.getMyEntries();
    let maxEntries = await lottoInstance.MaxEntriessperTransaction();
    let minimumEntries = await lottoInstance.Minimum_Entries();
    let newPot = await lottoInstance.NextRoundPot();
    // let = await lottoInstance.ResultsLog (uint)()
    let roundDuration = await lottoInstance.RoundDuration();
    let roundEntries = await lottoInstance.RoundEntries();
    let startTime = await lottoInstance.StartTime();
    let ticketPrice = await lottoInstance.TicketPrice();

    console.log("numbers", {
      currentJackpot,
      countDown,
      myEntries,
      maxEntries,
      minimumEntries,
      newPot,
      roundDuration,
      roundEntries,
      startTime,
      ticketPrice,
    });

    return {
      currentJackpot: (currentJackpot / 10 ** 18).toFixed(0),
      countDown,
      //   myEntries: Number(myEntries),
      maxEntries: Number(maxEntries),
      minimumEntries: Number(minimumEntries),
      newPot: (newPot / 10 ** 18).toFixed(0),
      roundDuration: Number(roundDuration),
      roundEntries: Number(roundEntries),
      startTime: Number(startTime),
      ticketPrice: (ticketPrice / 10 ** 18).toFixed(0),
    };
  } catch (error) {
    console.log(error, "getLottoNumbers");
  }
};

export const EnterDraw = async (_amount) => {
  try {
    let signer = await getSigner();
    let newInstance = new ethers.Contract(lottoAddress, ABI, signer);

    let tx = await newInstance.EnterDraw(_amount);

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log(error);
    if (error.data) {
      window.alert(error.data.message);
    }
  }
};

export const getUserValues = async (userAddress) => {
  try {
    let signer = await getSigner();
    let newInstance = new ethers.Contract(lottoAddress, ABI, signer);

    let myEntries = await newInstance.getMyEntries();
    let balance = await newInstance.balanceOf(userAddress);

    return {
      myEntries: Number(myEntries),
      balance: Number(balance / 10 ** 18).toFixed(2),
    };
  } catch (error) {
    console.log(error, "getUserValues");
  }
};
//getCountDown
//getMyEntries
//MaxEntriessperTransaction
//Minimum_Entries
//NextRoundPot
//ResultsLog (uint)
//RoundDuration
//RoundEntries
//StartTime
//TicketPrice

// EnterDraw (uint)

//balanceOf

const getSigner = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    return web3Provider.getSigner(0);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    return newProvider.getSigner(0);
  }
};
