import React, { useState, useEffect } from "react";

import {
  fetchContractData,
  fetchUserData,
  // setAutoPayout,
  claimRewards,
} from "../blockchain/functions";
import Header from "../components/Header";
import Rewards from "../components/Rewards";
// import CenterContent from "../components/CenterContent";
import Lotto from "../components/Lotto";
import Exchangep from "../components/Exchangep";
import MobileMenu from "../components/MobileMenu";
import { Modal } from "react-bootstrap";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import logo from "../assets/images/logo.png";

const Home = (props) => {
  const [smShow, setSmShow] = useState(false);
  const tokens = [];
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [view, setView] = useState(1);

  const [contractData, setContractData] = useState({
    AirdropPot: "",
    BuyBackPotBNB: "",
    LotteryPot: "",
    RafflePot: "",
    SellSlippage: "",
    autoPayout: "",
    availableTokens: [],
    distributedRewards: "",
    holdersPot: "",
    rewardCycle: "",
    nextBuyBack: "",
    tokens: [],
  });
  const [userData, setUserData] = useState({
    BNBremaining: "",
    ShowMyRewardSLICES: [],
    ShowMyRewardTOKENS: [],
    userTokens: [],
    autoPayOutActive: false,
    userBalance: null,
  });

  const changeView = (id) => {
    setView(id);
  };

  const setUserTokens = (newTokens) => {
    setUserData({
      ...userData,
      userTokens: newTokens,
    });
  };

  const userClaimRewards = async () => {
    let receipt = await claimRewards(walletType, userAddress);
    if (receipt) {
      console.log(receipt);
    }
  };

  // const setAutoClaim = async () => {
  //   if (!userAddress) {
  //     connectWallet();
  //   } else {
  //     let receipt = await setAutoPayout(
  //       !userData.autoPayOutActive,
  //       walletType,
  //       userAddress
  //     );
  //     if (receipt) {
  //       console.log(receipt);
  //     }
  //   }
  //   getUserData();
  // };

  const connectWallet = async () => {
    console.log("hola");
    setSmShow(true);
  };

  const connectMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
      setWalletType("Metamask");
      getUserData();
      setSmShow(false);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // if (chainId !== "0x38") {
      //   await window.ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: "0x38" }],
      //   });
      // }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
        network: "binance",
        chainId: 56,
        infuraId: null,
      });

      await provider.enable();

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();

      setUserAddress(accounts[0]);
      setWalletType("Trust_wallet");
      getUserData();

      setSmShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        56: "wss://bsc-dataseed.binance.org/",
      },
      network: "binance",
    });
    await provider.disconnect();
  };

  const logout = async () => {
    console.log("logout");
    if (walletType === "Trust_wallet") {
      disconnectWalletConnect();
    }
    setUserAddress("");
  };

  const getContractData = async () => {
    let result = await fetchContractData();

    setContractData(result);
  };

  const getUserData = async () => {
    if (userAddress !== "") {
      let result = await fetchUserData("", userAddress);
      let userTokens = await getSelectedTokens(result);
      setUserData({ ...result, userTokens });
    }
  };

  const getSelectedTokens = async (data) => {
    let singlePayout = [];
    let selected = [];
    data.ShowMyRewardSLICES.map((el, i) => {
      if (el === "100") {
        let index = data.ShowMyRewardTOKENS[i];

        singlePayout = [
          {
            name: contractData.availableTokens[index]?.label,
            value: Number(el),
            fill: contractData.availableTokens[index]?.color,
          },
        ];
      } else if (el !== "0") {
        let index = data.ShowMyRewardTOKENS[i];

        selected.push({
          name: contractData.availableTokens[index]?.label,
          value: Number(el),
          fill: contractData.availableTokens[index]?.color,
        });
      }
    });
    if (singlePayout.length !== 0) {
      return singlePayout;
    }

    return selected;
  };

  useEffect(() => {
    let user = window.localStorage.getItem("userAddress");
    if (user) {
      connectMetamask();
    }
    getContractData();
    getUserData();
  }, []);
  useEffect(() => {
    getUserData();
  }, [userAddress]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [view]);

  return (
    <div className="container-fluid app-container">
      <Header
        logout={logout}
        connectWallet={connectWallet}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        contractData={contractData}
        balance={userData.userBalance}
      />
      <div className="sections">
        <div
          className={
            "sections__item " + (view === 1 ? "active-tab" : "inactive-tab")
          }
        >
          <Rewards
            contractData={contractData}
            tokens={contractData.availableTokens}
            // setAutoClaim={setAutoClaim}
            userAddress={userAddress}
            connectWallet={connectWallet}
            userTokens={userData.userTokens}
            BNBremaining={userData.userTokens}
            // autoClaim={userData.autoPayOutActive}
            setUserTokens={setUserTokens}
            walletType={walletType}
            userClaimRewards={userClaimRewards}
            userData={userData}
          />
        </div>

        <div
          className={
            "sections__item " + (view === 3 ? "active-tab" : "inactive-tab")
          }
        >
          <Lotto
            setSmShow={setSmShow}
            userAddress={userAddress}
            walletType={walletType}
          />
        </div>
        <div
          className={
            "sections__item " + (view === 2 ? "active-tab" : "inactive-tab")
          }
        >
          <Exchangep
            connectWallet={connectWallet}
            userAddress={userAddress}
            contractData={contractData}
            tokens={tokens}
            walletType={walletType}
          />
        </div>
      </div>
      <MobileMenu view={view} changeView={changeView} />
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-md"
        className="modal"
      >
        <Modal.Header closeButton>
          <img src={logo} className="logo" />
        </Modal.Header>
        <Modal.Body className="exchange-modal">
          <h5>Connect your Wallet</h5>

          <button className="claybtn6 " onClick={() => connectMetamask()}>
            Metamask
          </button>
          <div className="wallet-modal-spacer" />
          <button className="claybtn6" onClick={() => connectMetamask()}>
            Trust Wallet
          </button>
          <div className="wallet-modal-spacer" />
          <button className="claybtn6" onClick={() => connectWalletConnect()}>
            Walletconnect
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
