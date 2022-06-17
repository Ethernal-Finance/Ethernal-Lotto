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
      <div className="no-mobile Adspace3"><iframe  
            src='//ad.a-ads.com/2029305?size=970x90'
            data-aa='2029305'
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
                  Connect Wallet
                </Button>
              </div>
            )}
            <div className="navbar1">
            
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
                    Connect Wallet
                  </Button>
                </div>
              )}
            </Navbar.Collapse>
            </div>

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
