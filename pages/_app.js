// pages/_app.js
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css"; // or just "./globals.css" if that works
import { PayoutProvider } from "@/components/PayoutContext";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <PayoutProvider>
        <Component {...pageProps} />
      </PayoutProvider>
    </SessionProvider>
  );
}
