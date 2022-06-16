import React from "react";

function Popup3(props) {
  return props.trigger ? (
    <div className="popup3">
      <div className="popup-inner3 ">
        <button className="close-btn3 " onClick={() => props.setTrigger(false)}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup3;
