import { useState, useEffect } from "react";
import Select from "./common/Select";
import graphLogo from "../assets/images/graph-logo.png";
import {
  getLottoNumbers,
  EnterDraw,
  getUserValues
} from "../blockchain/functions/lottery";
import Countdown from "react-countdown";

export default function Lotto({ userAddress, walletType, setSmShow }) {
  const [list, setList] = useState([
    { title: "Lotto Tokens", selected: true, icon: graphLogo, id: 0 },
    { title: "Lotto Tokens", selected: false, icon: graphLogo, id: 1 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState("1");
  const [userDetails, setUserDetails] = useState({
    myEntries: "",
    balance: "0"
  });
  const [lottoDetails, setLottoDetails] = useState({
    currentJackpot: "",
    countDown: "",
    maxEntries: "",
    minimumEntries: "",
    newPot: "",
    roundDuration: "",
    roundEntries: "",
    startTime: "",
    ticketPrice: "",
    myEntries: ""
  });

  const handleEnter = async () => {
    setIsLoading(true);
    let receipt = await EnterDraw(tickets);
    if (receipt) {
      console.log(receipt);
      getUserNumbers();
      getNumbers();
    }
    setIsLoading(false);
  };

  const getData = (time) => {
    let data = new Date(time * 1000).toString();
    let split = data.split(" ");

    return `${split[0]} ${split[1]} ${split[2]} ${split[3]}`;
  };

  const getNumbers = async () => {
    let result = await getLottoNumbers();
    if (result) {
      setLottoDetails({ ...result });
    }
  };

  const getUserNumbers = async () => {
    if (userAddress) {
      let result = await getUserValues(userAddress);
      if (result) {
        setUserDetails({ ...result });
      }
    }
  };

  ///////setting counter
  const [hours, setHours] = useState(lottoDetails.countDown[1]);
  const [minutes, setMinutes] = useState(lottoDetails.countDown[2]);
  const [seconds, setSeconds] = useState(lottoDetails.countDown[3]);

  function countDownCounter() {
    setHours(lottoDetails.countDown[1]);
    setMinutes(lottoDetails.countDown[2]);
    setSeconds(lottoDetails.countDown[3]);
  }

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            //clearInterval(myInterval);
            countDownCounter();
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  useEffect(() => {
    //console.log(lottoDetails);
    setHours(lottoDetails.countDown[1]);
    setMinutes(lottoDetails.countDown[2]);
    setSeconds(lottoDetails.countDown[3]);
    console.log(minutes);
  }, [lottoDetails]);

  useEffect(() => {
    getUserNumbers();
  }, [userAddress]);

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <div className="lotto">
      <div className="lotto__header">
        <h1 className="lotto__title">Lotto *BETA*</h1>
      </div>
      <div className="lotto__body">
        <div className="lotto__cost">
          <span>Cost:</span>{" "}
          <span>{lottoDetails.ticketPrice * tickets} LOTTO TOKENS</span>{" "}
        </div>
        <div className="lotto__background lotto__columns">
          <div className="lotto__column">
            <div className="lotto__row">
              <span>Buy Tickets</span>
              <span>
                Your Tickets: <strong>{userDetails.myEntries}</strong>
              </span>
            </div>
            {/* <input
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              type="number"
            /> */}
            <div className="exchange-input">
              <input
                type="number"
                className="form-control"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                min="0"
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div className="lotto__row">
              <span>Lotto Tokens</span>
              <span>
                Balance: <strong>{userDetails.balance}</strong>
              </span>
            </div>
          </div>
          {/* <div className="lotto__column">
            <div className="lotto__row">
              <span>Lotto Tokens</span>
              <span>
                Balance: <strong>{userDetails.balance}</strong>
              </span>
            </div>
            <Select
              list={list}
              setList={(index) =>
                setList((state) =>
                  state.map((item, itemIndex) => ({
                    ...item,
                    selected: itemIndex === index ? true : false,
                  }))
                )
              }
            />
          </div> */}
        </div>
        {lottoDetails.ticketPrice * tickets > userDetails.balance && (
          <p className="lotto__error">Not enough balance...</p>
        )}
        <button
          disabled={
            lottoDetails.ticketPrice * tickets > userDetails.balance ||
            isLoading
          }
          onClick={userAddress ? handleEnter : () => setSmShow(true)}
          className="lotto__button button"
        >
          Buy Tickets
        </button>
        <div className="lotto__background lotto__info">
          <div className="lotto__title">Information</div>
          <ul className="lotto__list">
            <li className="lotto__item">
              <span>Jackpot</span>
              <span>{lottoDetails.currentJackpot}</span>
            </li>
            {/* <li className="lotto__item">
              <span>Results Log</span>
              <span>********</span>
            </li> */}
            <li className="lotto__item">
              <span>Countdown</span>
              <span>{`${hours} hours, ${minutes} minutes, ${seconds} seconds`}</span>
            </li>
            <li className="lotto__item">
              <span>Round Duration</span>
              <span>12 hour</span>
            </li>
            <li className="lotto__item">
              <span>My Entries</span>
              <span>{userDetails.myEntries}</span>
            </li>
            <li className="lotto__item">
              <span>Round Entries</span>
              <span>{lottoDetails.roundEntries}</span>
            </li>
            <li className="lotto__item">
              <span>Max Entries Per Transaction</span>
              <span>{lottoDetails.maxEntries}</span>
            </li>
            <li className="lotto__item">
              <span>Start Time</span>
              <span>
                {lottoDetails.startTime && getData(lottoDetails.startTime)}
              </span>
            </li>
            <li className="lotto__item">
              <span>Minimum Entries</span>
              <span>{lottoDetails.minimumEntries}</span>
            </li>
            <li className="lotto__item">
              <span>Ticket Price</span>
              <span>{lottoDetails.ticketPrice}</span>
            </li>
            <li className="lotto__item">
              <span>Next Round Pot</span>
              <span>{lottoDetails.newPot}</span>
            </li>
            <div className="disfont">
              Disclaimer: The Decentralized Autonomous Lottery is decentralized,
              experimental, and is provided with NO guarantees or warranties of
              any kind. Lotto tokens are NOT bank deposits, are NOT legal
              tender, You agree that the use of Ethernal Lotto is at your own
              risk. In no event should anyone but yourself be liable for any
              direct or indirect losses caused by any activities on this site or
              any other site hosted by Ethernal Finance DAO! Investing in
              cryptocurrencies and NFTs are inherently risky activities. You
              must conduct your due diligence before buying or selling any
              cryptocurrency or NFT and come to your conclusions.{" "}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
