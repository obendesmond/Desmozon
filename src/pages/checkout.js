import axios from "axios";
import CheckoutProduct from "components/CheckoutProduct";
import Layout from "components/Layout";
import useAuth from "hooks/useAuth";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectTotal } from "slices/basketSlice";
import { selectItems } from "slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const basketItems = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);
  const Currency = price => <p>$ {price ? price : totalPrice}</p>;
  const { currentUser } = useAuth();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: basketItems,
      email: currentUser.email,
    });

    // redirect user to stripe checkout with the session id created above
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

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
              {basketItems.length === 0
                ? "Your Shopping Basket Is Empty"
                : "Shopping Basket"}
            </h1>
            {basketItems.map((item, i) => (
              <CheckoutProduct key={i} product={item} />
            ))}
          </div>
        </div>

        {/* right section */}
        {basketItems.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({basketItems.length} items):
              <span className="font-bold">{Currency()}</span>
            </h2>

            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!currentUser}
              className={`button mt-2 ${
                !currentUser &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!currentUser ? "Sign In To Checkout" : "Proceed To Checkout"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Checkout;
