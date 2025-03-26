import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseITemQuantity,
  getPizzaQuantityById,
  increaseITemQuantity,
} from "./cartSlice";

export default function UpdateItemQuantity({ id }) {
  const dispatch = useDispatch();

  const quantity = useSelector(getPizzaQuantityById(id));

  return (
    <div className='sm:space-x-2 space-x-1'>
      <Button type='small' onClick={() => dispatch(increaseITemQuantity(id))}>
        +
      </Button>
      <span className='text-sm font-medium'>{quantity}</span>
      <Button type='small' onClick={() => dispatch(decreaseITemQuantity(id))}>
        -
      </Button>
    </div>
  );
}
