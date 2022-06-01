import React from "react";
import { FiCopy } from "react-icons/fi";
import { BiWallet } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import {
  Navbar,
  
  Button,
} from "react-bootstrap";

import TopSlider from "./TopSlider";

import logo from "../assets/images/logo.png";


const Header = (props) => {
  const { userAddress, connectWallet, setUserAddress, contractData, balance} = props;
  const walletConnected = false;

  const holdersPot = props.holdersPot || 555;
  const potPaid = props.potPaid || 555;
  // const rafflePot = props.rafflePot || 555;
  const lotteryPot = props.lotteryPot || 555;
  const distribute = props.distribute || 555;
  const airDroppedPot = props.airDroppedPot || 555;

  return (
    <div className="header ">
      <div className="row ">
      <div className="Adspace3"><iframe  
            src='//ad.a-ads.com/1932700?size=970x90'
            data-aa='1932700'
            title="Lotto Ad"
            frameBorder="no"
            width="970px"
            height="90px"
            /></div>
        <div className="col-md-12">
          
          <Navbar variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">
              <img src={logo} className="logo" /> 
              
            </Navbar.Brand>
            {userAddress && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
            {!userAddress && (
              <div
                className="update-preferences-btn mt-2 mb-2 only-mobile"
                style={{
                  width: "100%",
                }}
              >
                <Button
                  className="claybtn8"
                  variant="primary"
                  onClick={connectWallet}
                  disabled={contractData.availableTokens.length === 0}
                >
                  Connect wallet
                </Button>
              </div>
            )}

             {/* <div className="d-flex menu">
              <div className="flex-item flex-grow">
                <span className="sp-item-top">Holders Pot</span>
                <span className="sp-item-bottom">
                  {Number(contractData.holdersPot).toFixed(4)} BNB
                </span>
              </div>
              <div className="flex-item flex-grow">
                <span className="sp-item-top">Lottery Pot</span>
                <span className="sp-item-bottom">
                  {Number(contractData.LotteryPot)
                    .toFixed(0)
                    .toLocaleString("en-US")}{" "}
                  ETHFIN
                </span>
              </div>
              <div className="flex-item flex-grow">
                <span className="sp-item-top">BUYBACK POT</span>
                <span className="sp-item-bottom">
                  {Number(contractData.BuyBackPotBNB).toFixed(4)} BNB
                </span>
              </div>
              <div className="flex-item flex-grow">
                <span className="sp-item-top">HOLDERS TIL BUYBACK</span>
                <span className="sp-item-bottom">
                  {Number(contractData.nextBuyBack).toFixed(0)}
                </span>
              </div>
              <div className="flex-item flex-grow">
                <span className="sp-item-top">Rewards to all holders</span>
                <span className="sp-item-bottom">
                {Number(contractData.distributedRewards).toFixed(2)} BUSD
                </span>
              </div>
            </div> */}
            <Navbar.Collapse
              className="just-ri justify-content-end"
              id="basic-navbar-nav"
            >
              {userAddress && (
                <div className="nav-right d-flex flex-row align-items-center">
                  <div className="wallet-address-container">
                    <div className="wallet-add">
                      <BiWallet /> Your Wallet Address
                    </div>
                    <span className="add">
                      <FiCopy
                        style={{ cursor: "pointer" }}
                        className="no-mobile"
                        onClick={() =>
                          navigator.clipboard.writeText(userAddress)
                        }
                      />
                      {userAddress.slice(0, 6)}...{userAddress.slice(-10)}
                      <FiCopy
                        style={{ cursor: "pointer" }}
                        className="only-mobile"
                        onClick={() =>
                          navigator.clipboard.writeText(userAddress)
                        }
                      />
                    </span>
                    <div>
                {balance ? (
                  <>
                  <div className="text-gray">Your Ethfin Balance</div>
                    <div className="text-primary sub-header">
                      {Number(balance).toFixed(2)}
                    </div>
                    
                    
                  </>
                ) : (
                  <><div className="text-gray">Your Token Balance</div>
                    <div className="text-primary sub-header">0</div>
                    
                  </>
                )}
              </div>
                  </div>
                  <div className="">
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      onClick={(e) => {
                        e.preventDefault();
                        props.logout();
                      }}
                    >
                      <span className="signout">
                        <HiOutlineLogout />
                      </span>
                      <span className="only-mobile signout-text">Log out</span>
                    </a>
                  </div>
                </div>
              )}
              {!userAddress && (
                <div className="update-preferences-btn mt-2 mb-2 no-mobile">
                  <Button
                    className="send-token-button"
                    variant="primary"
                    onClick={connectWallet}
                    disabled={contractData.availableTokens.length === 0}
                  >
                    Connect wallet
                  </Button>
                </div>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      <div className="row mob-display ">
        <div className="mob-scroll-wrap">
        <TopSlider holdersPot={Number(contractData.holdersPot).toFixed(4)}
                  rafflePot={Number(contractData.RafflePot).toFixed(0)}
                  lotteryPot={Number(contractData.LotteryPot).toFixed(0)}
                  distribute={Number(contractData.BuyBackPotBNB).toFixed(4)}
                  airDroppedPot={Number(contractData.AirdropPot).toFixed(0)}
                  nextBuyBack={contractData.nextBuyBack}
                  distributedRewards={Number(contractData.distributedRewards).toFixed(2)} BUSD
                  balance={Number(balance).toFixed(2)}/>
                  
                  
                  
        </div>
        <div className="slider-gradient"></div>
      </div>
    </div>
  );
};

export default Header;
