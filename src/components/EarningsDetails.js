import React from "react";
import { ReactComponent as Clock } from "../assets/images/clock.svg";

const EarningsDetails = (props) => {
  const { userData } = props;
  const earningsRemain = props.earningsRemain || "3,973.29";

  return (
    <div className="earning-container">
      <div className="earning-icon2">
        <div>
          <Clock />
        </div>
      </div>
      <div className=" text-start">
        <div className="text-white">Earnings Availble</div>
        <div className="text-primary">
          {Number(userData.BNBremaining).toFixed(18)} BNB
        </div>
      </div>
    </div>
  );
};

export default EarningsDetails;
