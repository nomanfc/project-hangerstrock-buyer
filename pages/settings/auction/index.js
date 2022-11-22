import Head from "next/head";
import AuctionDataSettings from "../../../src/components/Settings/AuctionDataSetting/AuctionDataSettings";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Auction Settings</title>
        <meta name="Auction Settings" content="Auction Settings data" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>

      <div
        style={{
          fontSize: "30px",
          color: "#599f22",
          fontWeight: 700,
          marginBottom: "30px",
        }}
      >
        Auction settings
      </div>

      <div>
        <AuctionDataSettings />
      </div>
    </div>
  );
}
