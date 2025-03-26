// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilites/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna  exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  // call api from another route without navigatinga// using useFetcher hook
  const fetcher = useFetcher();

  useEffect(() => {
    // will get the data from menu route
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className='px-4 py-6 space-y-8'>
      <div className='flex items-center justify-between flex-wrap'>
        <h2 className='text-xl font-semibold'>Order # {id} status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='bg-red-500 text-red-50 rounded-full text-sm uppercase font-semibold py-1 px-2 tracking-wide'>
              Priority
            </span>
          )}
          <span className='bg-green-500 text-green-50 rounded-full text-sm uppercase font-semibold py-1 px-2 tracking-wide'>
            {status} order
          </span>
        </div>
      </div>

      <div
        className='flex items-center
       justify-between 
       flex-wrap gap-2 bg-stone-200
      px-6 py-5'
      >
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='divide-stone-200 divide-y'>
        {cart.map((item, index) => (
          <OrderItem
            item={item}
            key={index}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// get params by default inside the destructing obj like using uiseParams but it's only work inside component not regular function
export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}

export default Order;
