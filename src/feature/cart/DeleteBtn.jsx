import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

export default function DeleteBtn({ id }) {
  const dispatch = useDispatch();

  return (
    <Button type={"small"} onClick={() => dispatch(deleteItem(id))}>
      delete
    </Button>
  );
}
