import Head from "next/head";
import CreateAdmin from "../../../src/components/Admin/create/CreateAdmin";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Admin</title>
        <meta name="Admin" content="Admin data" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>

      <div style={{marginTop:"100px"}}>
        <CreateAdmin/>
      </div>
    </div>
  );
}
