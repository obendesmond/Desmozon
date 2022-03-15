import Banner from "components/Banner";
import Header from "components/Header";
import ProductFeed from "components/ProductFeed";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Desmozon | Amazon 2.0 by Desmond Oben</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl xl:mx-20">
        <Banner />

        {/* product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(res =>
    res.json()
  );

  return {
    props: { products },
  };
}

// GET >>> https://fakestoreapi.com/products
