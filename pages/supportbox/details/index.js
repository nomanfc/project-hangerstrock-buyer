import Head from "next/head";
import Image from "next/image";

import DetailsMessage from "../../../src/components/Support Inbox/DetailsMessage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Message Details</title>
        <meta name="Message Details" content="Message Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          fontSize: "30px",
          color: "#599f22",
          fontWeight: 700,
          marginBottom: "30px",
        }}
      >
        Message Details
      </div>

      <div>
        <DetailsMessage />
      </div>
    </div>
  );
}
