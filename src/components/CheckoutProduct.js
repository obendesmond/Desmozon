import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "slices/basketSlice";

// receive the properties of the item
function CheckoutProduct({ product }) {
  const dispatch = useDispatch();
  const { id, title, rating, price, description, category, image, hasPrime } =
    product;
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
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* middle section */}
      <div className="col-span-3 mx-5 justify-self-center">
        <p>{title}</p>

        <div className="flex">
          {Array(Math.ceil(rate))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>

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
      </div>

      {/* right remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="mt-auto button">
          Add To Basket
        </button>
        <button onClick={removeItemFromBasket} className="mt-auto button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
