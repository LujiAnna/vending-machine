import React, { useState, useEffect, useRef } from "react";
import Button, { ButtonValue } from "./Button";
import Product from "./Product";
import Price from "./Price";
import styles from "./App.module.css";
import shelves from "./data";
import { scrollLeft } from "./utils/text";
import clsx from "clsx";
import hand from "./img/hand.svg";
import trash from "./img/trash.png";

const keyPad: ButtonValue[][] = [
  ["A", "1", "2"],
  ["B", "3", "4"],
  ["C", "5", "6"],
  ["D", "7", "8"],
  ["E", "9", "0"],
  ["F", "*", "CLR"],
];

type Screen = "BALANCE" | "INPUT_CODE" | "MESSAGE";

function App() {
  const [inputCode, setInputCode] = useState("");
  const [balance, setBalance] = useState(0);
  const [screen, setScreen] = useState<Screen>("BALANCE");
  const [message, setMessage] = useState("");
  const [dispensingId, setDispensingId] = useState<string | null>(null);
  const productsRef = useRef(null);

  const handleCodeClick = (value: ButtonValue) => {
    setScreen("INPUT_CODE");
    if (value === "CLR") {
      setInputCode("");
    } else {
      setInputCode(inputCode + value);
    }
  };

  const addMoney = (amount: number) => {
    setScreen("BALANCE");
    setBalance(balance + amount);
  };

  const displayMessage = async (msg: string, time = 2000) => {
    setScreen("MESSAGE");

    await scrollLeft(msg, setMessage);

    setMessage("");
    setScreen("BALANCE");
  };

  const dispense = (inputCode: string) => {
    const shelf = shelves.find((shelf) => shelf.letter === inputCode[0]);
    const index = Number(inputCode[1]) - 1;
    const product = shelf?.items[index];

    if (product == null) {
      displayMessage("INVALID");
    } else if (balance >= product.price) {
      setBalance(balance - product.price);
      setScreen("BALANCE");
      setDispensingId(product.id);
    } else {
      displayMessage("INSUFFICIENT FUNDS");
    }
  };

  useEffect(() => {
    if (dispensingId == null) return;
    setTimeout(() => {
      setDispensingId(null);
    }, 2000);
  }, [dispensingId]);

  useEffect(() => {
    if (inputCode.length < 2) return;
    if (inputCode.length === 2) {
      dispense(inputCode);

      setInputCode("");
    }
  }, [inputCode]);

  return (
    <>
      <div className={styles.vendingMachine}>
        <img className={styles.trash} src={trash} />
        <div>
          <div className={styles.products} ref={productsRef}>
            {shelves.map((shelf, index) => {
              return (
                <div className={styles.shelf} key={index}>
                  {shelf.items.map((item, i) => {
                    return (
                      <Product
                        key={item.id}
                        id={item.id}
                        dispensingId={dispensingId}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        code={shelf.letter + (i + 1)}
                        containerRef={productsRef}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={styles.doorFrame}>
            <div className={styles.door} />
          </div>
          <img src={hand} className={styles.hand} />
          <div className={styles.money}>
            <button className={styles.coin1} onClick={(e) => addMoney(100)}>
              £1
            </button>
            <button className={styles.coin2} onClick={(e) => addMoney(50)}>
              50p
            </button>
            <button className={styles.coin3} onClick={(e) => addMoney(10)}>
              10p
            </button>
          </div>
        </div>

        <div className={styles.keypadContainer}>
          <div className={styles.keypad}>
            <div
              className={clsx(styles.screen, {
                [styles.scrolling]: screen === "MESSAGE",
              })}
            >
              {screen === "INPUT_CODE" && <span>{inputCode}</span>}
              {screen === "BALANCE" && <Price value={balance / 100} />}
              {screen === "MESSAGE" && <span>{message}</span>}
            </div>

            {keyPad.map((keys, row) => (
              <div key={row} className={styles.keyPadRow}>
                {keys.map((key, col) => (
                  <Button key={col} value={key} onClick={handleCodeClick} />
                ))}
              </div>
            ))}
            <div className={styles.paymentContainer}>
              <button
                className={styles.changeButton}
                onClick={(e) => setBalance(0)}
              />
              <div className={styles.coinSlot}></div>
            </div>
          </div>
        </div>
        <div className={styles.poster}>
          EAT.
          <br />
          SLEEP.
          <br />
          WORK.
          <br />
          REPEAT.
        </div>
      </div>
    </>
  );
}

export default App;
