import Head from "next/head";
import Admin from "../../src/components/Admin/Admin";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta name="Admin" content="Admin data" />
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
        Admin
      </div>

      <div>
        <Admin/>
      </div>
    </div>
  );
}
