import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkComp from "../../ui/LinkComp";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  // const cart = fakeCart;

  const { cartItems } = useSelector((state) => state.cart);

  const { userName } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className='px-4 py-3'>
      <LinkComp to='/menu'>&larr; Back to menu</LinkComp>

      <h2 className='pt-7 text-xl font-semibold'>Your cart, {userName}</h2>

      <ul className='divide-y divide-slate-200'>
        {cartItems.map((item) => (
          <CartItem item={item} key={item.name} />
        ))}
      </ul>
      <div className='space-x-2 mt-6'>
        <Button to='/order/new' type='primary'>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
