import Layout from "components/Layout";
import Image from "next/image";

function Checkout() {
  return (
    <Layout>
      <div className="lg:flex max-w-screen-2xl xl:mx-20">
        {/* left section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              Your Shopping Basket Is Empty
            </h1>
          </div>
        </div>

        {/* right section */}
      </div>
    </Layout>
  );
}

export default Checkout;
