import { CheckCircleIcon } from "@heroicons/react/solid";
import Layout from "components/Layout";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";

function success() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleGoToOrders = () => {
    router.push(`/${currentUser.email}`);
  };

  return (
    <Layout>
      <div className="bg-gray-200 h-screen">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col p-10 bg-white">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 h-10" />
              <h1 className="text-3xl">
                Thank you, your order has been confirmed
              </h1>
            </div>

            <p>
              Thank you for shopping with us, We'll send a confirmation onces
              your items have been shipped. If you would like to check the
              status of your order(s) please click the button below!
            </p>
            <button onClick={handleGoToOrders} className="button mt-8 ">
              Go to my orders
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default success;
