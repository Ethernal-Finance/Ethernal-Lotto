import React from "react";

import { ReactComponent as Rewards1 } from "../assets/images/rewards1.svg";
import { ReactComponent as Rewards2 } from "../assets/images/rewards2.svg";
import { ReactComponent as Exchange1 } from "../assets/images/exchange1.svg";
import { ReactComponent as Exchange2 } from "../assets/images/exchange2.svg";

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu  d-flex justify-content-around">
      <div
        className={props.view === 1 ? "selected-tab" : ""}
        onClick={() => {
          props.changeView(1);
        }}
      >
        <div>{props.view === 1 ? <Rewards2 /> : <Rewards1 />}</div>
        <div className="text-gray">Rewards</div>
      </div>
      <div
        className={props.view === 3 ? "selected-tab" : ""}
        onClick={() => {
          props.changeView(3);
        }}
      >
        <div>{props.view === 3 ? <Rewards2 /> : <Rewards1 />}</div>
        <div className="text-gray">Lotto</div>
      </div>
      <div
        className={props.view === 2 ? "selected-tab" : ""}
        onClick={() => {
          props.changeView(2);
        }}
      >
        <div>{props.view === 2 ? <Exchange2 /> : <Exchange1 />}</div>
        <div className="text-gray">Exchange</div>
      </div>
    </div>
  );
};

export default MobileMenu;
