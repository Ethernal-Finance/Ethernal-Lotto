import { useState, useEffect } from "react";
import Select from "./common/Select";
import graphLogo from "../assets/images/graph-logo.png";
import {
  getLottoNumbers,
  EnterDraw,
  getUserValues,
} from "../blockchain/functions/lottery";
import Countdown from "react-countdown";

export default function Lotto({ userAddress, walletType, setSmShow }) {
  const [list, setList] = useState([
    { title: "EFlotto", selected: true, icon: graphLogo, id: 0 },
    { title: "EFlotto", selected: false, icon: graphLogo, id: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState("1");
  const [userDetails, setUserDetails] = useState({
    myEntries: "",
    balance: "0",
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
    myEntries: "",
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
      setLottoDetails({...result});
    }
  };

  const getUserNumbers = async () => {
    if (userAddress) {
      let result = await getUserValues(userAddress);
      if (result) {
        setUserDetails({...result});
      }
    }
  };

  useEffect(() => {
    getUserNumbers();
  }, [userAddress]);

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <div className="lotto">
      <div className="lotto__header">
        <h1 className="lotto__title">Lotto</h1>
      </div>
      <div className="lotto__body">
        <div className="lotto__cost">
          <span>Cost:</span>{" "}
          <span>{lottoDetails.ticketPrice * tickets} EFlotto</span> -{" "}
          <span>5% discount</span>
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
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>
          <div className="lotto__column">
            <div className="lotto__row">
              <span>Currency</span>
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
          </div>
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
              <span>Holders Pot</span>
              <span>{lottoDetails.currentJackpot}</span>
            </li>
            {/* <li className="lotto__item">
              <span>Results Log</span>
              <span>********</span>
            </li> */}
            <li className="lotto__item">
              <span>Get Countdown</span>
              <span>
                {lottoDetails.countDown &&
                  `${lottoDetails.countDown[2]} minutes,${lottoDetails.countDown[3]} seconds`}
              </span>
            </li>
            <li className="lotto__item">
              <span>Round Duration</span>
              <span>{lottoDetails.roundDuration}</span>
            </li>
            <li className="lotto__item">
              <span>Get My Entries</span>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
