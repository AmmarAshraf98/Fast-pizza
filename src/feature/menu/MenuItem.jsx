import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilites/helpers";
import { addItem, getPizzaQuantityById } from "../cart/cartSlice";
import DeleteBtn from "../cart/DeleteBtn";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  const currentQuantity = useSelector(getPizzaQuantityById(id));
  const isInCart = currentQuantity > 0;

  return (
    <li className='flex gap-4 py-2 '>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-75 grayscale" : ""}`}
      />
      <div className='flex flex-col grow'>
        <p className='text-md capitalize font-semibold pt-0.5'>{name}</p>
        <p className='italic capitalize text-stone-500 text-sm'>
          {ingredients.join(", ")}
        </p>
        <div className='mt-auto  flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='font-semibold text-sm uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {isInCart && (
            <>
              <UpdateItemQuantity id={id} />
              <DeleteBtn id={id} />
            </>
          )}

          {!soldOut && !isInCart && (
            <Button type='small' onClick={handleAddToCart}>
              add to cart
            </Button>
          )}

          {/* <div className='bun_action flex items-center gap-1'>
            <Button>-</Button>
            <p>1</p>
            <Button>+</Button>
            <Button>delte</Button>
          </div> */}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
