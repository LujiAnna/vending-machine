import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export type ButtonValue =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "*"
  | "CLR";

type ButtonProps = {
  value: ButtonValue;
  onClick: (value: ButtonValue) => void;
};

export default function Button({ value, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[value])}
      onClick={(e) => onClick(value)}
    >
      {value}
    </button>
  );
}
