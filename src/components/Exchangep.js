import React from "react";

import Exchange from "./Exchange";

const RightContent = (props) => {
  const { connectWallet, userAddress, contractData, walletType } = props;

  return (
      <Exchange
        connectWallet={connectWallet}
        userAddress={userAddress}
        tokens={props.tokens}
        contractData={contractData}
        walletType={walletType}
      />
  );
};

export default RightContent;
