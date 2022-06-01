import web3 from "../web3";
import ContratInterface, {
  contractAddress,
} from "../interface/contractInterface";
import ABI from "../abi/contractAbi.json";
import Web3 from "web3";

export const showRewards = async (walletType, userAddress) => {
  try {
    let myContract = await ContratInterface(walletType);
    const rewardSLICES = await myContract.methods
      .ShowMyRewardSLICES()
      .call({ from: userAddress });
    const rewardTOKENS = await myContract.methods
      .ShowMyRewardTOKENS()
      .call({ from: userAddress });

    return { rewardSLICES, rewardTOKENS };
  } catch (error) {
    console.log(error);
  }
};

export const fetchContractData = async () => {
  try {
    const provider = new Web3.providers.HttpProvider(
      "https://bsc-dataseed1.binance.org:443"
    );
    let web3 = new Web3(provider);

    let contractInstance = await new web3.eth.Contract(
      ABI.abi,
      contractAddress
    );

    let holdersPot = toBNB(
      await contractInstance.methods.HolderPotBNB().call()
    );
    let RafflePot = toBNB(await contractInstance.methods.RafflePot().call());
    let LotteryPot = toBNB(await contractInstance.methods.LotteryPot().call());
    let BuyBackPotBNB = toBNB(
      await contractInstance.methods.BuybackPotBNB().call()
    );
    let AirdropPot = toBNB(await contractInstance.methods.AirdropPot().call());
    let N_holders = await contractInstance.methods.N_holders().call();
    let HolderPos = await contractInstance.methods.HolderPos().call();
    let nextBuyOutHolders = await contractInstance.methods
      .NextBuybackMemberCount()
      .call();
    let DistHolderPos = await contractInstance.methods.DistHolderPos().call();
    let SellSlippage = await contractInstance.methods.SellSlippage().call();
    let distributedRewards = toBNB(
      await contractInstance.methods.distributedRewards().call()
    );
    let tokens = await contractInstance.methods.ShowAllRewardTokens().call();

    let availableTokens = tokens.map((token) => {
      return {
        label: token,
        value: token,
        color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      };
    });

    let rewardCycle = (HolderPos / N_holders) * 100;
    let autoPayout = (DistHolderPos / N_holders) * 100;
    return {
      holdersPot,
      RafflePot,
      LotteryPot,
      BuyBackPotBNB,
      AirdropPot,
      SellSlippage,
      distributedRewards,
      rewardCycle,
      autoPayout,
      availableTokens,
      nextBuyBack: Number(nextBuyOutHolders) - Number(N_holders),
      tokens,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserData = async (walletType, userAddress) => {
  try {
    let contractInstance = await ContratInterface(walletType);

    let ShowMyRewardSLICES = await contractInstance.methods
      .ShowMyRewardSLICES()
      .call({ from: userAddress });
    let ShowMyRewardTOKENS = await contractInstance.methods
      .ShowMyRewardTOKENS()
      .call({ from: userAddress });
    let autoPayOutActive = await contractInstance.methods
      .getMyAutoPayoutisActive()
      .call({ from: userAddress });
    const userBalance = await contractInstance.methods
      .balanceOf(userAddress)
      .call();

    const BNBremaining = await contractInstance.methods
      .MyAvailableRewards()
      .call({ from: userAddress });

    return {
      ShowMyRewardSLICES,
      ShowMyRewardTOKENS,
      autoPayOutActive,
      userBalance: toBNB(userBalance),
      BNBremaining: toBNB(BNBremaining),
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatePreferences = async (
  _tokens,
  _slices,
  length,
  walletType,
  userAddress
) => {
  try {
    let contractInstance = await ContratInterface(walletType);
    let singlePayoutToken = false;
    if (length === 1) {
      singlePayoutToken = true;
    }

    let tx;
    if (singlePayoutToken) {
      tx = await contractInstance.methods.ChooseSinglePayoutToken(_tokens[0]);
      console.log("singlePayoutToken");
    } else {
      tx = await contractInstance.methods.ChooseMultiplePayoutTokens(
        _tokens[0],
        _slices[0],
        _tokens[1],
        _slices[1],
        _tokens[2],
        _slices[2],
        _tokens[3],
        _slices[3],
        _tokens[4],
        _slices[4],
        _tokens[5],
        _slices[5]
      );
      console.log("ChooseMultiplePayoutTokens");
    }

    let result = await tx.send({ from: userAddress });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const claimRewards = async (walletType, userAddress) => {
  try {
    let contractInstance = await ContratInterface(walletType);

    const receipt = await contractInstance.methods
      .ClaimMyRewards()
      .send({ from: userAddress });

    return receipt;
  } catch (error) {
    console.log(error);
  }
};

export const setAutoPayout = async (status, walletType, userAddress) => {
  try {
    let myContract = await ContratInterface(walletType);

    let result = await myContract.methods
      .setMyAutoPayout(status)
      .send({ from: userAddress });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const toBNB = (num) => {
  return web3.utils.fromWei(num);
};

const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
