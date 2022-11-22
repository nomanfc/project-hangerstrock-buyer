import Head from "next/head";
import AllSubmittedAuctions from "../../src/components/Auctions/AllSubmittedAuction"
export default function Home() {
  return (
    <div>
      <Head>
        <title>All Submitted</title>
        <meta name="All Submitted" content="All Submitted data" />
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
        All Submitted Auctions
      </div>

      <div>
        <AllSubmittedAuctions />
      </div>
    </div>
  );
}
