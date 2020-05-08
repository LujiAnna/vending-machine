import React from "react";
import Price from "./Price";
import styles from "./Product.module.css";

type ProductProps = {
  name: string;
  price: number;
  code: string;
  id: string;
  imageUrl: string;
};

export default function Product({
  name,
  price,
  code,
  id,
  imageUrl,
}: ProductProps) {
  return (
    <div className={styles.product}>
      <div className={styles.productImageContainer}>
        <div
          className={styles.productImage}
          style={{
            backgroundImage: `url("${imageUrl}")`,
          }}
        />
      </div>
      <div className={styles.productDetails}>
        <Price value={price / 100} /> - {code}
      </div>
    </div>
  );
}
