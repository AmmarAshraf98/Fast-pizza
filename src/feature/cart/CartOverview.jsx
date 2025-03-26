import { useSelector } from "react-redux";
import LinkComp from "../../ui/LinkComp";
import { getPizzaQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utilites/helpers";

function CartOverview() {
  const countOfPizza = useSelector(getPizzaQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!countOfPizza) return null;

  return (
    <div className='bg-stone-800 text-stone-200 py-4 px-4 sm:px-6 text-sm md:text-base flex items-center justify-between'>
      <p className='text-stone-300 space-x-4'>
        <span>{countOfPizza} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <LinkComp to='/cart'>Open cart &rarr;</LinkComp>
    </div>
  );
}

export default CartOverview;
