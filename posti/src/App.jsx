import React, { useState } from "react";
import "./App.css";

export default function App() {
  //State variables for weight, price and extra service clicks
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);
  const [isHomeDeliveryClicked, setIsHomeDeliveryClicked] = useState(false);
  const [isArrivalNoticeClicked, setIsArrivalNoticeClicked] = useState(false);
  const [isFragileClicked, setIsFragileClicked] = useState(false);
  const [isÅlandClicked, setIsÅlandClicked] = useState(false);

  // Function for calculating package price based on weight input
  function calculatePrice() {
    let calculatedPrice;

    //Setting the rules for package pricing based on weight
    if (weight === 0 || weight.trim() === "") {
      calculatedPrice = "Virheellinen paino";
    } else if (weight <= 2) {
      // Handling invalid input
      calculatedPrice = 15.5;
    } else if (weight <= 5) {
      calculatedPrice = 15.5;
    } else if (weight <= 10) {
      calculatedPrice = 16.5;
    } else if (weight <= 15) {
      calculatedPrice = 20.5;
    } else if (weight <= 35) {
      calculatedPrice = 32.5;
    } else {
      calculatedPrice = "Virheellinen paino"; // Handling invalid input
    }

    setPrice(calculatedPrice); // Update price state
  }

  //Resetting inputs and state
  function resetPrice() {
    setPrice(0);
    setWeight("");
    setIsHomeDeliveryClicked(false);
    setIsArrivalNoticeClicked(false);
    setIsFragileClicked(false);
    setIsÅlandClicked(false);
  }

  //Function for counting home delivery price
  function calculateDelivery() {
    setIsHomeDeliveryClicked(true); //disabling the button when clicked once
    const homeDeliveryPrice = price + 12.9;
    setPrice(homeDeliveryPrice);
  }
  //Button for counting paper arrival notice price
  function calculateArrivalNotice() {
    setIsArrivalNoticeClicked(true);
    const arrivedNotice = price + 3.9;
    setPrice(arrivedNotice);
  }

  //button for counting fragile delivery price
  function calculateFragileService() {
    setIsFragileClicked(true);
    const fragileService = price + 10.9;
    setPrice(fragileService);
  }
  //button for counting åland delivery price
  function calculateÅlandDelivery() {
    setIsÅlandClicked(true);
    const ålandDelivery = price + 2.0;
    setPrice(ålandDelivery);
  }

  //Inputs and UI
  return (
    <>
      <div className="container">
        <h1>Laske paketin toimitushinta Suomessa</h1>
        <div>
          <label>
            Syötä paketin paino:
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="KG"
            ></input>
          </label>
          <button className="mainBtn" onClick={calculatePrice}>
            Laske Hinta
          </button>
          <button className="mainBtn" onClick={resetPrice}>
            Nollaa
          </button>
        </div>
        <div className="price">
          <p>
            Arviotu hinta:{" "}
            {price !== "Virheellinen paino"
              ? price.toFixed(2) + "€"
              : "Virheellinen paino"}
          </p>
        </div>
        <div className="extraServiceBtn">
          <p>Lisäpalvelut:</p>
          <button
            className="serviceBtn"
            onClick={calculateDelivery}
            disabled={isHomeDeliveryClicked || price === "Virheellinen paino"} //Disabling the button when clicked once or invalid weight
          >
            Toimitus ovelle
          </button>
          <button
            className="serviceBtn"
            onClick={calculateArrivalNotice}
            disabled={isArrivalNoticeClicked || price === "Virheellinen paino"}
          >
            Paperinen saapumisilmoitus
          </button>
          <button
            className="serviceBtn"
            onClick={calculateFragileService}
            disabled={isFragileClicked || price === "Virheellinen paino"}
          >
            Särkyvä-lisäpalvelu
          </button>
          <button
            className="serviceBtn"
            onClick={calculateÅlandDelivery}
            disabled={isÅlandClicked || price === "Virheellinen paino"}
          >
            Toimitus Ahvenanmaalle
          </button>
        </div>
      </div>
    </>
  );
}
