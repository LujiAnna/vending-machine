import React, { useState, useEffect } from "react";
import Button, { ButtonValue } from "./Button";
import Product from "./Product";
import Price from "./Price";
import styles from "./App.module.css";
import shelves from "./data.json";

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

  const displayMessage = (msg: string, time = 2000) => {
    setScreen("MESSAGE");
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
      setScreen("BALANCE");
    }, time);
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
      displayMessage("INSUFF");
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
        <div className={styles.products}>
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
                      code={shelf.letter + (i + 1)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className={styles.keypadContainer}>
          <div className={styles.keypad}>
            <p className={styles.screen}>
              {screen === "INPUT_CODE" && inputCode}
              {screen === "BALANCE" && <Price value={balance / 100} />}
              {screen === "MESSAGE" && message}
            </p>

            {keyPad.map((keys, row) => (
              <div key={row}>
                {keys.map((key, col) => (
                  <Button key={col} value={key} onClick={handleCodeClick} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.money}>
        <button onClick={(e) => addMoney(100)}>Dollar</button>
        <button onClick={(e) => addMoney(25)}>Quarter</button>
        <button onClick={(e) => setBalance(0)}>Change</button>
      </div>
    </>
  );
}

export default App;
