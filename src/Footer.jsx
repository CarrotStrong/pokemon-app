import React from "react";
import pokeApiLogo from "./assets/pokeapi-logo.png";
import githubLogo from "./assets/github-mark.png";

function Footer() {
  return (
    <div className="grid place-items-center text-sm w-full">
      <p>Created by</p>
      <a
        className="flex justify-between align-center text-xl leading-[1.25rem] font-bold py-2"
        href="https://github.com/CarrotStrong"
        target="_blank"
      >
        <p>CarrotStrong</p>
        <img
          className="w-[1.25rem] h-[1.25rem] ml-1"
          src={githubLogo}
          alt="GitHub logo"
        />
      </a>
      <p>using</p>
      <a href="https://pokeapi.co/" target="_blank">
        <img className="w-20 my-[-20px]" src={pokeApiLogo} alt="PokeAPI logo" />
      </a>
    </div>
  );
}

export default Footer;
