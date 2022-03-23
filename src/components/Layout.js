import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Desmozon | Amazon 2.0 by Desmond Oben</title>
      </Head>

      <Header />

      {children}
    </div>
  );
}
