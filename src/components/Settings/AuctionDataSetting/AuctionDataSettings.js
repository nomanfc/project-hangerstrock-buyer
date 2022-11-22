import React from "react";

import Category from "../Category/Caterory";
import Condition from "../Condition/Condition";
import Inventory from "../Inventory/Inventory";
import Freight from "../Freight/Freight";
import Auction from "../Auction/Auction"


const AuctionDataSettings = () => {
  return (
    <>
      <div
        style={{
          fontWeight: 600,
          color: "gray",
          margin: "40px auto 20px auto",
          fontSize: "22px",
        }}
      >
        Additional Charges
      </div>
        <Auction/>
      <div
        style={{
          fontWeight: 600,
          color: "gray",
          margin: "100px auto 20px auto",
          fontSize: "22px",
        }}
      >
        Dropdown Settings
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "32%", marginBottom: "50px" }}>
          <Category />
        </div>
        <div style={{ width: "32%", marginBottom: "50px" }}>
          <Condition />
        </div>

        <div style={{ width: "32%", marginBottom: "50px" }}>
          <Inventory />
        </div>

        <div style={{ width: "32%", marginBottom: "50px" }}>
          <Freight />
        </div>
      </div>
    </>
  );
};

export default AuctionDataSettings;
