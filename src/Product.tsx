import React from "react";
import Price from "./Price";
import styles from "./Product.module.css";
import clsx from "clsx";
import ProductAnimation from "./ProductAnimation";

type ProductProps = {
  name: string;
  price: number;
  code: string;
  id: string;
  imageUrl: string;
  dispensingId: string | null;
  containerRef: any;
};

export default function Product({
  name,
  price,
  code,
  id,
  imageUrl,
  dispensingId,
  containerRef,
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

        {dispensingId === id && (
          <ProductAnimation
            className={clsx(styles.productImage, styles.dispensing)}
            maxOffsetY={576}
            imageUrl={imageUrl}
          />
        )}
      </div>
      <div className={styles.productDetails}>
        <Price value={price / 100} /> - {code}
      </div>
    </div>
  );
}
