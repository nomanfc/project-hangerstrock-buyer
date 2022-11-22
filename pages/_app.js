import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../src/components/Layouts/Layout.js";
import { UserProvider } from "../src/contexts/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "DM Sans",
  },
  palette: {
    primary: {
      main: "#599f22",
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const showHeader = router.pathname === "/login" ? false : true;

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
