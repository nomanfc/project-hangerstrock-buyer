import React from "react";
import Head from "next/head";
import AuctionDetail from "../../../src/components/AuctionDetails/newDetails";

const index = () => {
  return (
    <div>
      <Head>
        <title>Auction Details</title>
        <meta name="Auction Details" content="Auction Details" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      <AuctionDetail />
    </div>
  );
};

export default index;