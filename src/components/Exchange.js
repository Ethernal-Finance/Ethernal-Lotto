import React, { useState, useEffect } from "react";
import { VscArrowSwap } from "react-icons/vsc";
import { Modal } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import ExchangeDropdown from "./ExchangeDropdown";
import { tokensSupported } from "./supportedToken";
import Moralis from "moralis";
import Popup2 from "./Popup2";
// import Popup2mobile from "./Popup2mobile";
import {
  swap,
  getQuote,
  Approve,
  checkAllowance,
  checkBalance,
  getNativeBalance
} from "../blockchain/exchange/index";
import logo from "../assets/images/graph-logo.png";
import { ReactComponent as Blackpeach } from "../assets/images/Blackpeach.svg";

const Exchange = (props) => {
  const [divPopup2, setButtonPopup2] = useState(false);
  const { connectWallet, userAddress, contractData, walletType } = props;
  const [slippage, setSlippage] = useState("20");
  const [smShow, setSmShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supportedTokens = tokensSupported;
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [enoughAllowance, setEnoughAllowance] = useState(true);
  const [error, setError] = useState("");
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [selectedFromToken, setSelectedFromToken] = useState({
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    image:
      "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
    label: "BNB",
    logoURI:
      "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
    name: "BNB",
    symbol: "BNB",
    value: "BNB"
  });
  const [selectedToToken, setSelectedToToken] = useState({
    address: "0x17bd2e09fa4585c15749f40bb32a6e3db58522ba",
    decimals: 18,
    image: logo,
    label: "ETHFIN",
    logoURI: logo,
    symbol: "ETHFIN",
    name: "Ethernal Finance",
    value: "ETHFIN"
  });

  const setFromAddress = async () => {};

  const setToAddress = async () => {};

  const handleMax = async (side) => {
    if (side === "from") {
      setAmount(fromBalance, side);
    } else if (side === "to") {
      setAmount(toBalance, side);
    }
  };

  const setAmount = async (e, side) => {
    if (side === "from") {
      const value = Moralis.Units.Token(e, selectedFromToken.decimals);
      setFromAmount(e);
      quote(value, side);
    } else if (side === "to") {
      const value = Moralis.Units.Token(e, selectedToToken.decimals);
      setToAmount(e);
      quote(value.toString(), side);
    }
  };

  const handleSelect = async (e, side) => {
    if (side === "from") {
      setSelectedFromToken(e);
    } else if (side === "to") {
      setSelectedToToken(e);
    }
    setFromAmount("");
    setToAmount("");
  };

  const changeSides = async () => {
    let tokenIn = selectedFromToken;
    let tokenOut = selectedToToken;
    handleSelect(tokenIn, "to");
    handleSelect(tokenOut, "from");
  };

  //amount, path, walletType, quoteType
  const quote = async (value, side) => {
    if (value <= 0) {
      return;
    }
    if (side === "from") {
      let result = await getQuote(
        value,
        [selectedFromToken.address, selectedToToken.address],
        walletType,
        "amountOut"
      );

      setToAmount(
        (result[result.length - 1] / 10 ** selectedToToken.decimals).toFixed(12)
      );
    } else if (side === "to") {
      let result = await getQuote(
        value,
        [selectedFromToken.address, selectedToToken.address],
        walletType,
        "amountIn"
      );
      setFromAmount((result[0] / 10 ** selectedToToken.decimals).toFixed(12));
    }
  };

  const checkTokenAllowance = async () => {
    if (selectedFromToken.name === "BNB") {
      setEnoughAllowance(true);
    } else {
      let allowance = await checkAllowance(
        walletType,
        userAddress,
        selectedFromToken.address
      );

      if (allowance < 1) {
        setEnoughAllowance(false);
      } else {
        setEnoughAllowance(true);
      }
    }
  };

  const initSwap = async () => {
    setIsLoading(true);
    let amountIn = Moralis.Units.Token(fromAmount, selectedFromToken.decimals);
    let amountOut = (Number(toAmount) - (toAmount / 100) * slippage).toFixed(6);
    let amountOutMin = Moralis.Units.Token(
      amountOut.toString(),
      selectedToToken.decimals
    );
    let exchangeType;
    if (selectedFromToken.name === "BNB") {
      exchangeType = "ETHtoToken";
    } else if (selectedToToken.name === "BNB") {
      exchangeType = "tokenToEth";
    } else {
      exchangeType = "tokenToToken";
    }

    let receipt = await swap(
      amountIn,
      amountOutMin,
      [selectedFromToken.address, selectedToToken.address],
      userAddress,
      Date.now() + 1000 * 60 * 10,
      walletType,
      exchangeType
    );

    if (receipt) {
      console.log(receipt);
      getUserBalance();
    }
    setIsLoading(false);
  };

  const handleApprove = async () => {
    setIsLoading(true);
    let receipt = await Approve(
      walletType,
      userAddress,
      selectedFromToken.address
    );
    if (receipt) {
      checkTokenAllowance();
    }
    setIsLoading(false);
  };

  const getUserBalance = async () => {
    if (userAddress) {
      let inBalance;
      let outBalance;
      if (selectedFromToken.name === "BNB") {
        inBalance = await getNativeBalance(userAddress);
      } else {
        inBalance = await checkBalance(
          walletType,
          userAddress,
          selectedFromToken.address
        );
      }
      if (selectedToToken.name === "BNB") {
        outBalance = await getNativeBalance(userAddress);
      } else {
        outBalance = await checkBalance(
          walletType,
          userAddress,
          selectedToToken.address
        );
      }

      setFromBalance(
        Moralis.Units.FromWei(inBalance, selectedFromToken.decimals)
      );
      setToBalance(Moralis.Units.FromWei(outBalance, selectedToToken.decimals));
    }
  };

  useEffect(() => {
    checkTokenAllowance();
  }, [selectedFromToken]);

  useEffect(() => {
    getUserBalance();
  }, [selectedFromToken, selectedToToken, userAddress]);

  return (
    <div className="exchange">
      <div className="ExchangeInfoBox">
        <div className="ExchangeInfoHeader">
          <div>Exchange</div>
          <div className="claybtn2 exchange__header-button" onClick={() => setButtonPopup2(true)}>
            <Blackpeach className="Peach" />
          </div>

          <div>
            <Popup2 trigger={divPopup2} setTrigger={setButtonPopup2}>
              <div>
                <iframe
                  className="peachframe"
                  src={
                    "https://hub.peachfolio.app/?address=0x17bd2e09fa4585c15749f40bb32a6e3db58522ba&network=BSC&ticker=ETHFIN"
                  }
                  title="Rewards calculator"
                  frameBorder="no"
                  style={{}}
                />
              </div>
            </Popup2>
          </div>
        </div>
        <div className="sub-header-2 text-start">
          Trade tokens in an instant
        </div>
        <div className="text-start text-primary mt-3">
          <div className="mt-2 d-flex exchange-div-wrapper">
            <div className="text-gray">From</div>
            <div className="ms-auto d-flex">
              <div className="text-gray">Balance: </div>
              <div className="text-primary ms-1" style={{ fontWeight: 500 }}>
                {fromBalance.toFixed(4)}
              </div>
            </div>
          </div>
          <ExchangeDropdown
            tokens={supportedTokens}
            data={fromAmount}
            selectedValue={selectedFromToken}
            setData={setFromAddress}
            setAmount={setAmount}
            side={"from"}
            handleSelect={handleSelect}
            handleMax={handleMax}
          />
          <div className="exchange-arrows-container ">
            <div onClick={changeSides} className="exchange-arrows">
              <VscArrowSwap />
            </div>
            <div className="exchange-arrows-divider"></div>
          </div>
          <div className=" d-flex exchange-div-wrapper">
            <div className="text-gray">To</div>
            <div className="ms-auto d-flex">
              <div className="text-gray">Balance: </div>
              <div className="text-primary ms-1" style={{ fontWeight: 500 }}>
                {toBalance.toFixed(4)}
              </div>
            </div>
          </div>
          <ExchangeDropdown
            //   tokens={supportedTokens.filter((el) => el.value !== fromData.token)}
            tokens={supportedTokens}
            selectedValue={selectedToToken}
            data={toAmount}
            setData={setToAddress}
            setAmount={setAmount}
            side={"to"}
            handleSelect={handleSelect}
            handleMax={handleMax}
          />
        </div>
        <div className="button button--v1 exchange__button">
          {!userAddress ? (
            <div
              disabled={contractData.availableTokens.length === 0}
              onClick={connectWallet}
            >
              Connect Wallet
            </div>
          ) : enoughAllowance ? (
            <div
              className="claybtn3text"
              disabled={isLoading}
              onClick={initSwap}
            >
              {isLoading ? "Loading…" : "Swap"}
            </div>
          ) : (
            <div disabled={isLoading} onClick={handleApprove}>
              {isLoading ? "Loading…" : "Approve"}
            </div>
          )}
        </div>
        <div className="text-primary mt-3">{error && error}</div>
        <div className="selslip">
          Current sell slippage: {contractData.SellSlippage} %
        </div>
        <div className="custom-divider"></div>{" "}
      </div>

      <div className="mt-1 Adspace1 no-mobile">
        <iframe
          src="//ad.a-ads.com/1932517?size=320x50"
          data-aa="19325177"
          title="Lotto Ad"
          frameBorder="no"
        />
      </div>
      <div className="mt-1 only-mobile">
        <iframe
          src="//ad.a-ads.com/1932517?size=320x50"
          data-aa="19325177"
          title="Lotto Ad"
          frameBorder="no"
        />
      </div>
    </div>
  );
};

export default Exchange;
