import React, { useState } from "react";
import { updatePreferences } from "../blockchain/functions";
import RewardsChart from "./RewardsChart";
import TokenSlider from "./TokenSlider";
import AddAnother from "./AddAnother";
import PayoutDetails from "./PayoutDetails";
import Popup from "../components/Popup";
import EarningsDetails from "./EarningsDetails";
import { ReactComponent as Calc } from "../assets/images/Calc.svg";

const LeftContent = (props) => {
  const [divPopup, setButtonPopup] = useState(false);
  const {
    userTokens,
    setUserTokens,
    userData,
    connectWallet,
    userAddress,
    userClaimRewards,
    contractData
  } = props;
  // let userTokens = props.userTokens;
  // let setUserTokens = props.setUserData;
  const [total, setTotal] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState("");
  const [tokenSearch, setTokenSearch] = useState("");

  const addToken = (e) => {
    if (props.tokens.length) {
      let a = userTokens?.map((a) => a.name);
      let b = props.tokens.filter((el) => !a.includes(el.label));
      let obj = {
        name: b[0].label,
        value: parseInt(100 - total),
        fill: props.tokens.filter((el) => el.label === b[0].label)[0].color
      };

      let newData = JSON.parse(JSON.stringify(userTokens));
      newData.push(obj);

      setTotal(100);
      setUserTokens(newData);
    }
  };

  const updateRange = (value, tokenName) => {
    if (!value) value = 0;

    let a = [];

    let chartValues = JSON.parse(JSON.stringify(userTokens));
    let prevValue = chartValues.find((el) => el.name === tokenName).value;
    let diff = value - prevValue;

    let checkSum = parseInt(value);
    chartValues.map((el) => {
      if (el.name !== tokenName) return (checkSum += el.value);
    });

    let wholeDiff = checkSum - diff;
    let actualDiff = 100 - wholeDiff;

    if (checkSum <= 100 || (actualDiff > 0 && diff > actualDiff)) {
      chartValues.map((el) => {
        if (el.name !== tokenName) {
          return a.push(el);
        } else {
          return a.push({
            name: tokenName,
            value:
              actualDiff > 0 && diff > actualDiff
                ? prevValue + actualDiff
                : parseInt(value),
            fill: props.tokens.filter((el) => el.label === tokenName)[0].color
          });
        }
      });
      setTotal(parseInt(checkSum));
      setUserTokens(a);
    }
  };

  const updateTokenName = (e, keyTo) => {
    let a = userTokens;
    let check = a.find((el) => el.name === e.value);

    if (!check) {
      a[keyTo]["name"] = e.value;
      a[keyTo]["fill"] = props.tokens.filter(
        (el) => el.label === e.value
      )[0].color;
      setUserTokens(a);
    }
  };

  const removeItem = (index) => {
    let tempTokens = JSON.parse(JSON.stringify(userTokens));

    let totalNew = total - tempTokens[index].value;
    tempTokens.splice([index], 1);

    setTotal(totalNew);
    setUserTokens(tempTokens);
  };

  const updateUserPreferences = async () => {
    let tokens = [0, 0, 0, 0, 0, 0];
    let slices = [0, 0, 0, 0, 0, 0];
    let finalPerc = 0;
    let numberTokens = userTokens.length;
    userTokens.map((item, index) => {
      let tokenId = props.tokens.findIndex((el) => el.label === item.name);
      finalPerc = finalPerc + Number(item.value);
      tokens[index] = tokenId;
      slices[index] = item.value;
      return item;
    });

    if (finalPerc < "100") {
      return window.alert("Final Percentage Should be 100%");
    }
    console.log(tokens, slices, numberTokens);

    let receipt = await updatePreferences(
      tokens,
      slices,
      numberTokens,
      props.walletType,
      props.userAddress
    );
    if (receipt) {
      console.log(receipt);
    }
  };

  return (
    <>
      <div className="payout-info">
        <div className="payoutinfo2">
          <div className="payoutinfoHeader">
            <span>Your Rewards</span>
            <div className="claybtn2" onClick={() => setButtonPopup(true)}>
              <Calc class="Calc" />
            </div>
          </div>
          <PayoutDetails contractData={props.contractData} userData={userData} />
          <EarningsDetails userData={userData} contractData={contractData} />
          {userTokens.length === 0 ? (
            <RewardsChart
              chartData={[
                {
                  name: "",
                  value: 100,
                  fill: "#29125D"
                }
              ]}
              total={100}
            />
          ) : (
            <>
              <RewardsChart chartData={userTokens} total={total} />

              <div className="token-slider-container">
                {userTokens.map((item, id) => {
                  return (
                    <TokenSlider
                      key={id}
                      tokens={
                        tokenSearch
                          ? props.tokens
                            .filter(
                              (el) =>
                                !userTokens.find((el2) => el2.name === el.label)
                            )
                            .filter((el) =>
                              el.label
                                .toLowerCase()
                                .includes(tokenSearch.toLowerCase())
                            )
                          : props.tokens.filter(
                            (el) =>
                              !userTokens.find((el2) => el2.name === el.label)
                          )
                      }
                      item={item}
                      color={item.fill}
                      tokenSearch={tokenSearch}
                      setTokenSearch={(e) => {
                        setTokenSearch(e.target.value);
                      }}
                      setMenuOpen={() => setIsMenuOpen(id)}
                      setMenuClose={() => {
                        setIsMenuOpen("");
                        setTokenSearch("");
                      }}
                      handleSelect={(e) => updateTokenName(e, id)}
                      handleChange={(e) => updateRange(e, item.name)}
                      removeToken={() => removeItem(id)}
                      isMenuOpen={isMenuOpen === id ? true : false}
                      total={total}
                      isScrolling={userTokens.length >= 3 ? true : false}
                    />
                  );
                })}
              </div>

              {userTokens.length < 6 && <AddAnother addToken={addToken} />}
            </>
          )}
        </div>

        <div className="payout-info__buttons">
          <button
            className="button button--v1 payout-info__button"
            onClick={
              props.userAddress ? updateUserPreferences : props.connectWallet
            }
            disabled={props.contractData.availableTokens.length === 0}
          >
            {props.userAddress ? "Update Preferences" : "Connect Wallet"}
          </button>

          <button className="button button--v1 payout-info__button">
            {userAddress ? (
              <div
                disabled={userData.BNBremaining <= 0.000001 ? true : false}
                onClick={userClaimRewards}
              >
                Claim rewards
              </div>
            ) : (
              <div
                disabled={contractData.availableTokens.length <= 1 ? true : false}
                onClick={connectWallet}
              >
                Connect Wallet
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="mt-1 only-mobile">
        <iframe
          src="//ad.a-ads.com/1932517?size=320x50"
          data-aa="19325177"
          title="Lotto Ad"
          frameBorder="no"
        />
      </div>

      <Popup trigger={divPopup} setTrigger={setButtonPopup}>
        <iframe
          src={"https://calculator.ethernalfinance.io"}
          title="Rewards calculator"
          frameBorder="no"
          style={{
            justifyContent: "flex-start",
            width: "340px",
            height: "768px",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            // border: "1px solid #dd6e0a",
            borderRadius: "1rem",
            backgroundColor: "#20053a"
          }}
        />
      </Popup>
    </>
  );
};

export default LeftContent;
