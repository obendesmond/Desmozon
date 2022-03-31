import React from "react";
import Layout from "components/Layout";
import useAuth from "hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseBackend";
import getAllDocuments from "firebaseBackend/getAllDocuments";
import moment from "moment";
import getCurrentUser from "firebaseBackend/getCurrentUser";

function orders({ orders }) {
  const { currentUser } = useAuth();
  console.log("orders getting through: ", orders);
  return (
    <Layout>
      <div className="bg-gray-200 h-screen">
        <div className="max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
            Your Orders
          </h1>

          {currentUser ? (
            <h2>x orders</h2>
          ) : (
            <h2>Please sign in to see your orders</h2>
          )}

          <div className="mt-5 space-y-4"></div>
        </div>
      </div>
    </Layout>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get the users logedin credentials
  const user = await getCurrentUser();

  if (user) console.log("USER: ", user);
  else console.log("NO USER");

  //   if (!currentUser) return { props: {} };

  //   Firebase db
  const stripeOrders = await getAllDocuments(
    `users/obendesmond2@gmail.com/orders`,
    {
      name: "timestamp",
      value: "desc",
    }
  );

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.map(async order => ({
      id: order.id,
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(order.timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: { orders },
  };
}
