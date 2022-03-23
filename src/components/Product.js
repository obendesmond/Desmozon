import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "slices/basketSlice";

function Product({ id, title, price, description, category, image, rating }) {
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();
  const { rate, count } = rating;

  const Currency = price => <p>$ {price}</p>;

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      qty: 1,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3 ">{title}</h4>

      <div className="flex">
        {Array(Math.ceil(rate))
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs mt-2 my-2 line-clamp-2">{description}</p>

      <div className="mb-5">{Currency(price)}</div>

      {hasPrime && (
        <div className="flex item-center space-x-2">
          <img
            loading="lazy"
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt=""
          />
          <p className="text-xs text-gray-500 mt-4">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
