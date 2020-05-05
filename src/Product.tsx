import React from "react";
import clsx from "clsx";
import Price from "./Price";
import styles from "./Product.module.css";

type ProductProps = {
  name: string;
  price: number;
  code: string;
  id: string;
  dispensingId: string | null;
};

export default function Product({
  name,
  price,
  code,
  id,
  dispensingId,
}: ProductProps) {
  return (
    <div
      className={clsx(styles.product, {
        [styles.dispensing]: dispensingId === id,
      })}
    >
      {name} - <Price value={price / 100} /> - {code}
    </div>
  );
}
