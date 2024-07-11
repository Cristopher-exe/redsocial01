import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HomeSection.css";
function HomeSection() {
  return (
    <div className="home-container">
      <h1>¡RESERVAR AHORA! </h1>
      <p>Cada evento es único e irrepetible.</p>
      <p>¡Creemos juntos experiencias inolvidables!</p>
      <div className="home-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
         ¡Contactanos! 
         <i className="fa-solid fa-envelope" />"
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          RESERVA 
          <i className="fa-solid fa-cart-shopping" />
        </Button>
      </div>
    </div>
  );
}
export default HomeSection;
