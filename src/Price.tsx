import React from "react";

type PriceProps = {
  value: number;
};

export default function Price({ value }: PriceProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return <span>{formatter.format(value)}</span>;
}
