import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState();

  // get form status if submitting
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  // only get the error return if exist
  const actionError = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const { userName } = useSelector((state) => state.user);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      {/* <Form method='POST' action='/order/new'> */}
      <Form method='POST'>
        <div className='mb-5 flex flex-col sm:flex-row sm:items-center gap-2 '>
          <label className='sm:basis-40'>First Name</label>
          <input
            type='text'
            name='customer'
            required
            className='input grow'
            defaultValue={userName}
          />
        </div>

        <div className='mb-5 flex flex-col sm:flex-row sm:items-center gap-2'>
          <label className='sm:basis-40'>Phone number</label>

          <div className='grow'>
            <input type='tel' name='phone' required className='input  w-full' />
            {actionError?.phone && (
              <p className='text-xs text-red-700 bg-red-100 rounded-md py-1 px-1.5 mt-2'>
                {actionError.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex flex-col sm:flex-row sm:items-center gap-2'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              className='input w-full'
            />
          </div>
        </div>

        <div className='mb-8 flex items-center gap-8'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-semibold'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button type='primary' disabled={isSubmitting}>
            {isSubmitting ? "picking order ..." : "order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// create function ||| action which will be excuted while submitting the form
export async function action({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);

  const error = {};

  if (!isValidPhone(data.phone))
    error.phone =
      "please enter a valid phone number, so we might need it contact you.";

  if (Object.keys(error).length > 0) return error;

  console.log(data);

  // prepare order object to send to backend & modify the priority property & get the cart back to be an object
  const order = {
    ...data,
    // were need to change it before useing useState to
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  console.log(order);

  // if everythings is ok create an order
  const newOrder = await createOrder(order);

  // clear the cart
  store.dispatch(clearCart());

  // navigate to order page using redirect cause useNavigate work only with component not a reqular function
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
