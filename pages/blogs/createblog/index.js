import Head from "next/head";
import Image from "next/image";
import CreateBlog from "../../../src/components/Blogs/Create Blog/CreateBlog";

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
        Create Blog
      </div>

      <div>
        <CreateBlog />
      </div>
    </div>
  );
}
