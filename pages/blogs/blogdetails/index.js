import Head from "next/head";
import Image from "next/image";

import BlogDetails from "../../../src/components/Blogs/Details Blog/BlogDetails";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blog Details</title>
        <meta name="Blog Details" content="All Blogs" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>
      
      <div>
        <BlogDetails />
      </div>
    </div>
  );
}
