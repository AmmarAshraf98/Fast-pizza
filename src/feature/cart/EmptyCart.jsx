import LinkComp from "../../ui/LinkComp";

function EmptyCart() {
  return (
    <div className='px-5 py-8'>
      <LinkComp to='/menu'>&larr; Back to menu</LinkComp>

      <p className='mt-8 font-semibold'>
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
