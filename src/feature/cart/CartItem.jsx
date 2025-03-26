import Button from "../../ui/Button";
import { formatCurrency } from "../../utilites/helpers";
import DeleteBtn from "./DeleteBtn";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className='py-3 sm:flex items-center justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-4'>
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} />
        <DeleteBtn id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
