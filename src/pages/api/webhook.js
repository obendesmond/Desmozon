import { buffer } from "micro";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "firebaseBackend";

// establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfilOrder = async session => {
  // console.log("Fulfilling Order",session)

  return setDoc(
    doc(db, "users", `${session.metadata.email}`, "orders", `${session.id}`),
    {
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: serverTimestamp(),
    }
  )
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    })
    .catch(err => console.log("ERROR: ", err.message));
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error: ", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // fulfil the order
      return fulfilOrder(session)
        .then(() => res.status(200))
        .catch(err => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
