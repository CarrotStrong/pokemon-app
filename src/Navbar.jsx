import React from "react";
import appLogo from "./assets/app-logo.png";

function Navbar() {
  return (
    <div className="grid place-items-center py-4 bg-gray-100">
      <a href="">
        <img
          className="h-[50px]  drop-shadow-md"
          src={appLogo}
          alt="PokeAPP logo"
        />
      </a>
      <p className="absolute top-2 right-2">v1.0.0</p>
    </div>
  );
}

export default Navbar;
