import Head from "next/head";
import Image from "next/image";

import SupportInbox from "../../src/components/Support Inbox/SupportInbox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Support Message</title>
        <meta name="Support Message" content="Support Message" />
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
        Support Message
      </div>

      <div>
        <SupportInbox />
      </div>
    </div>
  );
}
