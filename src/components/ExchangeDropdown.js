import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { Form } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/images/graph-logo.png";

const ExchangeDropdown = (props) => {
  const selectValue = props.selectedValue;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [tokenToSearch, setTokenToSearch] = useState("");

  const handleAmountChange = (e) => {
    props.setAmount(e, props.side);
  };

  const handleValueChange = (e) => {
    props.setData(e.address);
  };

  function strtodec(amount) {
    let stringf = "";
    for (var i = 0; i < selectValue.decimals; i++) {
      stringf = stringf + "0";
    }
    return amount + stringf;
  }

  const ValueContainer = ({ children, ...subProps }) => {
    if (props.logoURI) {
      let image = props.logoURI;
      return (
        <components.ValueContainer {...subProps}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              <img
                src={image}
                style={{
                  maxWidth: "17px",
                  maxHeight: "70%",
                  marginRight: 5,
                  marginTop: "-3px",
                }}
              />
            </span>
            <span style={{ display: "flex" }}>{children}</span>
          </div>
        </components.ValueContainer>
      );
    } else {
      return (
        <components.ValueContainer {...subProps}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectValue.logoURI}
                  style={{
                    maxWidth: "17px",
                    maxHeight: "17px",
                    marginRight: 5,
                    marginTop: "-3px",
                  }}
                />
                {children}
              </span>
            ) : (
              "Select"
            )}
          </div>
        </components.ValueContainer>
      );
    }
  };

  const Option = ({ children, ...subProps }) => {
    let image = subProps.data.logoURI;
    return (
      <components.Option {...subProps}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ padding: "0px", borderRadius: 0, lineHeight: 0 }}>
            <img src={image} style={{ maxWidth: "18px", maxHeight: "100%" }} />
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "5px",
              paddingBottom: "2px",
              width: "10px",
            }}
          >
            {children}
          </div>
        </div>
      </components.Option>
    );
  };

  const Control = ({ children, ...subProps }) => {
    return (
      <div
        style={{ cursor: "pointer" }}
        onTouchEnd={
          !menuIsOpen ? () => setMenuIsOpen(true) : () => setMenuIsOpen(false)
        }
        onClick={
          !menuIsOpen ? () => setMenuIsOpen(true) : () => setMenuIsOpen(false)
        }
      >
        <components.Control {...subProps}>{children}</components.Control>
      </div>
    );
  };
  const IndicatorsContainer = ({ children, ...subProps }) => {
    return (
      <div
        style={{ cursor: "pointer" }}
        onTouchEnd={
          !menuIsOpen ? () => setMenuIsOpen(true) : () => setMenuIsOpen(false)
        }
        onClick={
          !menuIsOpen ? () => setMenuIsOpen(true) : () => setMenuIsOpen(false)
        }
      >
        <components.IndicatorsContainer {...subProps}>
          {children}
        </components.IndicatorsContainer>
      </div>
    );
  };

  const Menu = ({ children, ...subProps }) => {
    return (
      <OutsideClickHandler onOutsideClick={() => setMenuIsOpen(false)}>
        <div
          style={{
            width: "100%",
            position: "absolute",
            zIndex: 10000,
            background: "#20053a",
            boxShadow: "0px 12px 40px rgba(53, 21, 72, 0.58)",
            borderRadius: "4px 4px 0 0",
          }}
          className="custom-dropdown"
        >
          <div
            style={{
              color: "black",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "40px",
                justifyContent: "center",
              }}
            >
              <FiSearch size="1.3em" color="#fff" />
            </div>
            <input
              type="text"
              id="tokenSearch"
              name="tokenSearch"
              placeholder="Search"
              value={tokenToSearch}
              onChange={(e) => setTokenToSearch(e.target.value)}
              className="form-control"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "none",
                boxShadow: "none",
                fontSize: "14px",
              }}
              autoFocus
              autoComplete="off"
            />
          </div>
          <components.Menu {...subProps}>{children}</components.Menu>
        </div>
      </OutsideClickHandler>
    );
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0)",
      fontWeight: 600,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      height: "38px",
    }),
    control: (provided, state) => ({
      ...provided,
      background: "rgba(255, 255, 255, 0.1)",
      boxShadow: "none",
      border: "none",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      height: "38px",
      zIndex: "0",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    menu: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      background: "#6610f2",
      zIndex: "6",
      "&:hover": {
        background: "#562bb5",
      },
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      padding: "10px 5px 10px 0px",
      div: {
        padding: 0,
      },
    }),
    // container: (provided, state) => ({
    //   ...provided,
    //   // width: "100%",
    //   padding: 0,
    //   border: "none",
    //   color: "#fff",
    //   fontWeight: 700,
    //   height: "100%",
    //   boxShadow: "none",
    //   fontSize: 12,
    //   borderRadius: 20,
    //   position: "initial",
    // }),
    // control: (provided, state) => ({
    //   ...provided,
    //   height: "45px",
    //   background: "transparent",
    //   boxShadow: "none",
    //   border: "none",
    //   borderTopLeftRadius: 12,
    //   borderTopRightRadius: 0,
    //   borderBottomRightRadius: 0,
    //   borderBottomLeftRadius: 12,
    //   fontWeight: 700,
    // }),
    // singleValue: (provided, state) => ({
    //   ...provided,
    //   color: "#fff",
    //   fontWeight: 700,
    //   boxShadow: "none",
    //   backgroundColor: state.isFocused ? "blue" : "",
    //   fontWeight: 700,
    // }),
    // dropdownIndicator: (provided, state) => ({
    //   ...provided,
    //   color: "#fff",
    //   "&:hover": {
    //     color: "#fff",
    //   },
    // }),
    menuList: (provided, state) => ({
      ...provided,
      background: "#20053a",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 0,
      background: "#6f42c1",
      width: "100%",
      marginLeft: "10",
      boxShadow: "none",
    }),
    // option: (provided, state) => ({
    //   ...provided,
    //   zIndex: "99",
    //   backgroundColor: state.isFocused ? "rgba(255,255,255)" : "",
    //   textAlign: "left",
    //   fontWeight: 700,
    //   "&:hover": {
    //     backgroundColor: "rgba(255,255,255)",
    //   },
    // }),
    // indicatorsContainer: (provided, state) => ({
    //   ...provided,
    //   padding: 0,
    //   div: {
    //     padding: "0px 2px 0 0",
    //   },
    // }),
    // valueContainer: (provided, state) => ({
    //   ...provided,
    //   padding: 0,
    // }),
  };

  return (
    <div className="exchange-dropdown">
      <div className="exchange-input">
        <input
          // disabled={selectValue.symbol == ""}
          type="number"
          className="form-control"
          id="tokenValue"
          name="tokenValue"
          value={props.data}
          onWheel={(e) => e.target.blur()}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
      </div>
      {/* {props.side === "from" && } */}
      <div onClick={() => props.handleMax(props.side)} className="exchange-max">
        <div>MAX</div>
      </div>
      <Select
        value={{
          value: selectValue.name,
          label: selectValue.symbol,
        }}
        onChange={(e) => {
          props.handleSelect(e, props.side);
          setMenuIsOpen(!menuIsOpen);
        }}
        menuIsOpen={menuIsOpen}
        isSearchable={false}
        options={
          tokenToSearch
            ? props.tokens.filter((el) =>
                el.label.toLowerCase().includes(tokenToSearch.toLowerCase())
              )
            : props.tokens
        }
        backspaceRemovesValue={false}
        components={{
          IndicatorSeparator: () => null,
          ValueContainer,
          Menu,
          Control,
          Option,
          IndicatorsContainer,
        }}
        styles={customStyles}
      />
    </div>
  );
};

export default ExchangeDropdown;
