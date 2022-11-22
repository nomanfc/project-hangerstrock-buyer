import Head from "next/head";
import Users from "../../src/components/Users/Users";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Users</title>
        <meta name="Users" content="Users data" />
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
        Users
      </div>

      <div>
        <Users />
      </div>
    </div>
  );
}
