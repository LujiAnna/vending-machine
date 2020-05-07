import React from "react";
import clsx from "clsx";
import Price from "./Price";
import styles from "./Product.module.css";
import crisps from "./img/crisps.svg";
import drink from "./img/drink-bottle.svg";

type ProductProps = {
  name: string;
  price: number;
  code: string;
  id: string;
  imageUrl: string;
  dispensingId: string | null;
};

export default function Product({
  name,
  price,
  code,
  id,
  imageUrl,
  dispensingId,
}: ProductProps) {
  return (
    <div
      className={clsx(styles.product, {
        [styles.dispensing]: dispensingId === id,
      })}
    >
      <div
        className={styles.productImage}
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      ></div>
      <div className={styles.productDetails}>
        <Price value={price / 100} /> - {code}
      </div>
    </div>
  );
}
