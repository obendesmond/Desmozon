import React from "react";
import useAuth from "hooks/useAuth";
import getAllDocuments from "firebaseBackend/getAllDocuments";
import moment from "moment";
import Order from "components/Order";
import Header from "components/Header";
import { useRouter } from "next/router";

function userOrders({ orders }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <div className=" h-screen">
        <div className="max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
            Your Orders
          </h1>

          {currentUser ? (
            <>
              <h2>{orders.length} order(s)</h2>
              <div className="mt-5 space-y-4">
                {orders?.map(
                  ({
                    id,
                    amount,
                    amountShipping,
                    items,
                    timestamp,
                    images,
                  }) => (
                    <Order
                      key={id}
                      id={id}
                      amount={amount}
                      amountShipping={amountShipping}
                      items={items}
                      timestamp={timestamp}
                      images={images}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <h2>Please sign in to see your orders</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default userOrders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get the users logedin credentials
  const userEmail = context.params.userEmail;

  if (!userEmail) return { props: {} };

  //   Firebase db
  const stripeOrders = await getAllDocuments(`users/${userEmail}/orders`, {
    name: "timestamp",
    value: "desc",
  });

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
