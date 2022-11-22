import Head from "next/head";
import Image from "next/image";
import EditBlog from "../../../src/components/Blogs/EditBlogs/EditBlog";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Edit Blogs</title>
        <meta name="Edit Blogs" content="Edit Blogs" />
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
        Edit Blog
      </div>

      <div>
        <EditBlog />
      </div>
    </div>
  );
}
