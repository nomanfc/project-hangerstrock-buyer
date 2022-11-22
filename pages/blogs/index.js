import Head from "next/head";
import Image from "next/image";

import Allblogs from "../../src/components/Blogs/All Blogs/Allblogs";

export default function Home() {
  return (
    <div>
      <Head>
        <title>All Blogs</title>
        <meta name="All Blogs" content="All Blogs" />
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
        All Blogs
      </div>

      <div>
        <Allblogs />
      </div>
    </div>
  );
}
