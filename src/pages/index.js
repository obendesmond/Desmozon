import Banner from "components/Banner";
import Layout from "components/Layout";
import ProductFeed from "components/ProductFeed";

export default function Home({ products }) {
  return (
    <Layout>
      <main className="max-w-screen-2xl xl:mx-20">
        {/* banner */}
        <Banner />

        {/* product feed */}
        <ProductFeed products={products} />
      </main>
    </Layout>
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
