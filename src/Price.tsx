import React from "react";

type PriceProps = {
  value: number;
};

export default function Price({ value }: PriceProps) {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return <span>{formatter.format(value)}</span>;
}
